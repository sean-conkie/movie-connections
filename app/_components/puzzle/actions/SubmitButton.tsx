import { useState } from "react"
import Button from "../../Button"
import { usePuzzle } from "@/app/PuzzleProvider"

const SubmitButton = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false)
  const { puzzleState, submitSelection } = usePuzzle()


  return (
    <Button className="btn-primary" loading={ isLoading } loadingText='Submitting' disabled={ (puzzleState?.selection??[]).length < 4 } onClick={ submitSelection }>Submit</Button>
  )
}

export default SubmitButton