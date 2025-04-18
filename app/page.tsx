'use client';

import ErrorFallback from "./_components/fallbacks/ErrorFallback";
import LoadingPuzzle from "./_components/fallbacks/LoadingPuzzle";
import PuzzleContainer from "./_components/puzzle/PuzzleContainer";
import { usePuzzle } from "./PuzzleProvider";

export default function Home() {
  const { puzzleState, isPuzzleLoading, isPuzzleError } = usePuzzle();

  return (
    <div className="flex flex-col items-center">
      {
        isPuzzleLoading && !isPuzzleError 
        ? <LoadingPuzzle />
        : (
          isPuzzleError 
          ? <ErrorFallback />
          : (
            puzzleState
            ? <PuzzleContainer />
            : <LoadingPuzzle />
          ) 
        )
      }
    </div>
  );
}
