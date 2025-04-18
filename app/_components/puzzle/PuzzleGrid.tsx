import { usePuzzle } from "@/app/PuzzleProvider"
import PuzzleGridRow from "./PuzzleGridRow"

const PuzzleGrid = () => {

  const { puzzleState } = usePuzzle()


  return (
    <div className="puzzle-grid">
      {
        puzzleState?.movieGrid &&
        puzzleState.movieGrid.map((movies, idx) => (
          <PuzzleGridRow key={ idx } movies={ movies } selection={ puzzleState.selection } />
        ))
      }
    </div>
  )
}

export default PuzzleGrid