import { usePuzzle } from "@/app/PuzzleProvider"

const PuzzleGridRowItem = ({ selected, title }: { selected?: boolean, title: string }) => {
  const { toggleSelection } = usePuzzle()

  return (
    <div className={ "puzzle-grid-row-item" + (selected ? ' puzzle-grid-row-item-selected' : '')} onClick={ () => { toggleSelection(title) } }>{ title }</div>
  )
}

export default PuzzleGridRowItem