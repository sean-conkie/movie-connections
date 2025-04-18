import { usePuzzle } from "@/app/PuzzleProvider"
import Button from "../../Button"

const ClearButton = () => {
  const { clearSelection, state } = usePuzzle()

  return (
    <Button className="btn-outline min-w-36" onClick={ clearSelection } disabled={ state !== "in_progress" } >Clear</Button>
  )
}

export default ClearButton