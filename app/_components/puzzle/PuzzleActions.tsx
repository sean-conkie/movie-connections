import ClearButton from "./actions/ClearButton"
import ShuffleButton from "./actions/ShuffleButton"
import SubmitButton from "./actions/SubmitButton"

const PuzzleActions = () => {
  return (
    <div className="flex flex-row w-full justify-center gap-4">
      <ShuffleButton />
      <ClearButton />
      <SubmitButton />
    </div>
  )
}

export default PuzzleActions