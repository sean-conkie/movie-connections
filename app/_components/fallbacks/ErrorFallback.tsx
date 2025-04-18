import NewPuzzleButton from "../puzzle/actions/NewPuzzleButton"

const ErrorFallback = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 text-slate-400 text-lg font-semibold">
      <span>Oh no! Something went wrong.</span>
      <NewPuzzleButton />
    </div>
  )
}

export default ErrorFallback