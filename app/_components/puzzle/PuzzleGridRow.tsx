import PuzzleGridRowItem from "./PuzzleGridRowItem"

const PuzzleGridRow = ({ movies, selection }: { movies: string[], selection?: string[] }) => {
  return (
    <div className="puzzle-grid-row">
    {
      movies.map((movie, idx) => (
        <PuzzleGridRowItem key={idx} title={ movie } selected={ (selection??[]).includes(movie) } />
      ))
    }
    </div>
  )
}

export default PuzzleGridRow