import { usePuzzle } from '@/app/PuzzleProvider'

const PuzzleTries = () => {
  const  { puzzleState }  = usePuzzle()

  const tries = puzzleState ? 4 - (puzzleState.tries??0) : 0

  return (
    <div className='flex flex-row gap-1'>
      <div className='text-muted-foreground h-full'>Remaining tries:</div>
      <ul>
        {
          Array.from({ length: tries }, (_, i) => (
            <li key={i} className={`inline-block w-4 h-4 rounded-full bg-slate-400 m-1`} />
          ))
        }
      </ul>
    </div>
  )
}

export default PuzzleTries