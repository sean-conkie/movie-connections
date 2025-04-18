import React from 'react'
import Button from '../../Button'
import { usePuzzle } from '@/app/PuzzleProvider'
import { openModal } from '../../modal/Modal'

const ViewResultButton = ({ modalId }: { modalId: string }) => {

  const { state } = usePuzzle()

  return (
    <Button className="btn-outline min-w-36" disabled={ state === "in_progress" } onClick={ () => openModal(modalId) }>View Results</Button>
  )
}

export default ViewResultButton