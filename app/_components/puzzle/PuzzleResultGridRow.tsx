import { Connection } from '@/app/types'
import PuzzleResultGridRowItem from './PuzzleResultGridRowItem'

const rowColors = [
  'bg-purple-400',
  'bg-blue-400',
  'bg-green-400',
  'bg-yellow-400',
  'bg-red-400'
]

const PuzzleResultGridRow = ({ connection, index }: { connection: Connection, index: number }) => {
  return (
    <div className={ "flex flex-col gap-4 w-full p-4 rounded-md " + rowColors[index] } >
      <div className="font-semibold text-center">{ connection.connection }</div>
      <div>
        <div className='grid grid-cols-4 gap-4 w-full'>
          { 
            connection.movies.map((movie, index) => {
              return <PuzzleResultGridRowItem key={ index } movie={ movie } />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default PuzzleResultGridRow