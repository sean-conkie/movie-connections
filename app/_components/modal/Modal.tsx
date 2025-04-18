import { PropsWithChildren } from 'react'


const Modal = ({ children, className, id }: PropsWithChildren<{ className?: string, id: string }>) => {

  const baseClassses = ["modal"]
  if (className) baseClassses.push(className)

  return (
    <dialog id={ id } className={ baseClassses.join(" ") }>
      <div className="modal-box">
        { children }
      </div>
    </dialog>
  )
}

export default Modal

export function openModal(id: string) {
  const modal = document.getElementById(id) as HTMLDialogElement
  if (modal && modal instanceof HTMLDialogElement) modal.showModal()
}
