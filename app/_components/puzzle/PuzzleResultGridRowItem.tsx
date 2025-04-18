import { Movie } from "@/app/types"
import Link from "next/link"


const PuzzleResultGridRowItem = ({ movie }: { movie: Movie }) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="text-center">
        <Link href={ movie.imdb_url } target="_blank">
          { `${movie.title} (${movie.year})` }
        </Link>
      </div>
    </div>
  )
}

export default PuzzleResultGridRowItem