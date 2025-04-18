import { usePuzzle } from "@/app/PuzzleProvider"
import Modal from "../modal/Modal"
import ModalAction from "../modal/ModalAction"
import ModalCloseButton from "../modal/ModalCloseButton"
import NewPuzzleButton from "./actions/NewPuzzleButton"

const PuzzleResult = () => {

  const { state } = usePuzzle()
  const modalId = 'results-modal'

  return (
    <>
      <div className="flex flex-row w-full justify-center gap-4">
        {/* <ViewResultButton modalId={ modalId } /> */}
        <NewPuzzleButton />
      </div>
      <Modal id={ modalId }>

        <h2 className="text-2xl font-bold text-center">Puzzle Results</h2>

        {
          state === 'completed' && (
            <p className="text-center">You solved the puzzle!</p>
          )
        }

        {
          state === 'failed' && (
            <p className="text-center">You failed to solve the puzzle!</p>
          )
        }

        <ModalAction>
          <NewPuzzleButton />
          <ModalCloseButton />
        </ModalAction>
      </Modal>
    </>
  )
}

export default PuzzleResult