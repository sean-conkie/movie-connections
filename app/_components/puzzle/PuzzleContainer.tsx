import { usePuzzle } from "@/app/PuzzleProvider"
import PuzzleActions from "./PuzzleActions"
import PuzzleGrid from "./PuzzleGrid"
import PuzzleResultGrid from "./PuzzleResultGrid"
import PuzzleTries from "./PuzzleTries"
import PuzzleResult from "./PuzzleResult"

const PuzzleContainer = () => {

  const { state } = usePuzzle()

  return (
    <div className="flex flex-col w-full h-full items-center gap-4 md:max-w-[50vw]">
      {
        state === "in_progress" ? <PuzzleTries /> : <PuzzleResult />
      }
      <PuzzleResultGrid />
      <PuzzleGrid />
      <PuzzleActions />
    </div>
  )
}

export default PuzzleContainer