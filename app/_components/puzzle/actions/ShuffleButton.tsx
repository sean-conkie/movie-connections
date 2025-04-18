import { usePuzzle } from "@/app/PuzzleProvider";
import Button from "../../Button"

const ShuffleButton = () => {

  const { shuffleMovieGrid, state } = usePuzzle();

  return (
    <Button className="btn-outline min-w-36" onClick={ shuffleMovieGrid } disabled={ state !== "in_progress" }>Shuffle</Button>
  )
}

export default ShuffleButton