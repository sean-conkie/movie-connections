import { usePuzzle } from "@/app/PuzzleProvider"
import PuzzleResultGridRow from "./PuzzleResultGridRow"


const PuzzleResultGrid = () => {

  const { puzzleState } = usePuzzle()

  return (
    <div className="flex flex-col w-full gap-4">
      {
        puzzleState &&
        (puzzleState.result??[]).map((row, rowIndex) => (
          <PuzzleResultGridRow key={ rowIndex } connection={ puzzleState.connections[row] } index={ row } />
        ))
      }
      {
        puzzleState &&
        (puzzleState.missed??[]).map((row, rowIndex) => (
          <PuzzleResultGridRow key={ rowIndex } connection={ puzzleState.connections[row] } index={ 4 } />
        ))
      }

    </div>
  )
}

export default PuzzleResultGrid