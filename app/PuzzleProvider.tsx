'use client';

import React, { createContext, useContext, useEffect, useState } from "react";
import { Connection, Game } from "./types";
import axios from "axios";
import toast from "react-hot-toast";

const PUZZLE_STORAGE_KEY = "puzzleState";

interface PuzzleContextType {
  puzzleState: Game | undefined;
  setPuzzleState: (state: Game) => void;
  newPuzzle: () => void;
  isPuzzleLoading: boolean;
  setIsPuzzleLoading: (loading: boolean) => void;
  isPuzzleError: boolean;
  setIsPuzzleError: (error: boolean) => void;
  shuffleMovieGrid: () => void;
  selection: string[];
  toggleSelection: (value: string) => void;
  clearSelection: () => void;
  submitSelection: () => void;
  state: "in_progress" | "completed" | "failed";
  tries: number;
  oneAway: boolean;
}

const PuzzleContext = createContext<PuzzleContextType | undefined>(undefined);

export const PuzzleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [puzzleState, setPuzzleState] = useState<Game>();
  const [isPuzzleLoading, setIsPuzzleLoading] = useState<boolean>(false);
  const [isPuzzleError, setIsPuzzleError] = useState<boolean>(false);

  const fetchPuzzle = async () => {
    try {
      setIsPuzzleLoading(true);
      setIsPuzzleError(false);
      const response = await axios.get<Game>("/api/connections/new");
      const game: Game = {
        ...response.data,
        state: "in_progress",
        tries: 0,
        result: [],
        movieGrid: createMovieGrid(response.data.connections)
      }
      setPuzzleState(game);
      setIsPuzzleLoading(false);
    } catch {
      setIsPuzzleLoading(false);
      setIsPuzzleError(true);
    }
  }

  // Load puzzle state from localStorage on mount
  useEffect(() => {
    const loadPuzzle = async () => {
      const savedState = localStorage.getItem(PUZZLE_STORAGE_KEY);
      if (savedState != null) {
        setPuzzleState(JSON.parse(savedState));
      } else {
        await fetchPuzzle();
      }
    }
    loadPuzzle();
  }, []);

  // Save puzzle state to localStorage whenever it changes
  useEffect(() => {
    if (puzzleState) {
      localStorage.setItem(PUZZLE_STORAGE_KEY, JSON.stringify(puzzleState));
    }
  }, [puzzleState]);

  // set the shuffled movie grid
  const createMovieGrid = (connections: Connection[], indexesToSkip: number[] = []): string[][] => {
    return shuffleAndDistribute(connections.map((connection, idx) => {
        if (!indexesToSkip.includes(idx)) {
          return connection.movies.map(movie => movie.title)
        }
        return undefined;
      }).filter((movies): movies is string[] => movies !== undefined))
  }

  // Create new puzzle
  const newPuzzle = async () => {
    await fetchPuzzle();
    // check that no movie appears in more than one connection
    // if it does raise an error
    if (puzzleState) {
      const movies = puzzleState.connections.flatMap(connection => connection.movies);
      const duplicates = movies.filter((movie, index) => movies.slice(index + 1).some(other => other.title === movie.title));
      if (duplicates.length > 0) {
        setIsPuzzleError(true);
        throw new Error(`Duplicate movies found: ${duplicates.map(movie => movie.title).join(", ")}`);
      }
    }
  };

  // shuffle movie grid
  // if the puzzleState is not undefined, create a new movie grid with the same connections but shuffled
  const shuffleMovieGrid = () => {
    if (puzzleState) {
      const newMovieGrid = createMovieGrid(puzzleState.connections, puzzleState.result ?? []);
      setPuzzleState({
        ...puzzleState,
        movieGrid: newMovieGrid
      });
    }
  }

  // toggle selection
  // string value passed to the function, if there are less than 4 selections and the value is not already selected, add it to the selection
  // if the value is already selected, remove it from the selection
  // if there are 4 selections do nothing
  const toggleSelection = (value: string) => {
    if (puzzleState) {
      if (puzzleState.selection === undefined) {
        setPuzzleState({
          ...puzzleState,
          selection: [value]
        });
      } else if (puzzleState.selection.includes(value)) {
        setPuzzleState({
          ...puzzleState,
          selection: puzzleState.selection.filter(v => v !== value)
        });
      } else if (puzzleState.selection.length < 4) {
        setPuzzleState({
          ...puzzleState,
          selection: [...puzzleState.selection, value]
        });
      }
    }
  }

  // clear selection
  const clearSelection = () => {
    if (puzzleState) {
      setPuzzleState({
        ...puzzleState,
        selection: []
      });
    }
  }

  // submit selection
  // if selection is length 4, check if it matches one of the connections
  // if it does, add the index of the connection to the result array
  // if the result array is length 4, the puzzle is complete
  const submitSelection = () => {
    if (puzzleState && (puzzleState.selection??[]).length === 4) {
      const selectedConnectionIndex = puzzleState.connections.findIndex(connection => connection.movies.every(movie => puzzleState.selection!.includes(movie.title)));
      if (selectedConnectionIndex !== -1) {
        // correct selection
        const newResult = [...(puzzleState.result??[]), selectedConnectionIndex];
        if (newResult.length === 4) {
          // puzzle complete
          toast.success('Congratulations! You won!');
          setPuzzleState({
            ...puzzleState,
            state: "completed",
            result: newResult,
            selection: [],
            movieGrid: undefined
          });
        } else {
          setPuzzleState({
            ...puzzleState,
            result: newResult,
            movieGrid: createMovieGrid(puzzleState.connections, newResult),
            selection: [],
          });
        }
      } else {
        // incorrect selection

        // Were we one selection away from completing the puzzle?
        // for each connection count how many movies are in the selection
        // if any connection has 3 movies in the selection, return true
        const oneAway = puzzleState.connections.some(connection => connection.movies.filter(movie => puzzleState.selection!.includes(movie.title)).length === 3);
        
        if (puzzleState.tries === 3) {

          // collate the indexes of the connections that were not guessed correctly
          const indexesToSkip = puzzleState.connections.map((connection, idx) => {
            if (!puzzleState.result?.includes(idx)) {
              return idx;
            }
            return undefined;
          }).filter((idx): idx is number => idx !== undefined);

          toast.error('Oh no! You lost :(');
          setPuzzleState({
            ...puzzleState,
            state: "failed",
            tries: 4,
            selection: [],
            missed: indexesToSkip,
            movieGrid: undefined
          });
        } else {
          if (oneAway) {
            toast('One away...');
          }
          setPuzzleState({
            ...puzzleState,
            tries: (puzzleState.tries??0) + 1,
          });
        }
      }
    }
  }


  return (
    <PuzzleContext.Provider value={{ 
      puzzleState, 
      setPuzzleState, 
      newPuzzle, 
      isPuzzleLoading, 
      setIsPuzzleLoading, 
      isPuzzleError,
      setIsPuzzleError, 
      shuffleMovieGrid, 
      selection: puzzleState?.selection ?? [], 
      toggleSelection, 
      clearSelection, 
      submitSelection, 
      state: puzzleState?.state ?? "in_progress", 
      tries: puzzleState?.tries ?? 0 ,
      oneAway: puzzleState?.oneAway ?? false
        }}>
      {children}
    </PuzzleContext.Provider>
  );
};

// Custom hook for easy access
export const usePuzzle = () => {
  const context = useContext(PuzzleContext);
  if (!context) {
    throw new Error("usePuzzle must be used within a PuzzleProvider");
  }
  return context;
};

export default function shuffleAndDistribute<T>(arrays: T[][]): T[][] {
  // Flatten the arrays into a single array
  const flatArray: T[] = arrays.flat();

  // Shuffle the flattened array
  for (let i = flatArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [flatArray[i], flatArray[j]] = [flatArray[j], flatArray[i]];
  }

  // Reconstruct the arrays with the same lengths
  const newArrays: T[][] = [];
  let index = 0;
  for (const arr of arrays) {
      newArrays.push(flatArray.slice(index, index + arr.length));
      index += arr.length;
  }

  return newArrays;
}