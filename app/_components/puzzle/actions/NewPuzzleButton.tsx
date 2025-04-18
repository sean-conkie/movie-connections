import { usePuzzle } from '@/app/PuzzleProvider'
import Button from '../../Button'


const NewPuzzleButton = () => {

  const { newPuzzle, state } = usePuzzle()

  return (
    <Button className="btn-primary min-w-36" disabled={ state === "in_progress" } onClick={ () => newPuzzle() }>New Puzzle</Button>
  )
}

export default NewPuzzleButton