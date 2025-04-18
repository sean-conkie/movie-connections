import { PropsWithChildren } from "react"

const ModalAction = ({ children }: PropsWithChildren<object>) => {
  return (
    <div className="modal-action">
      <form className="flex flex-row justify-end gap-4 w-full" method="dialog">
        { children }
      </form>
    </div>
  )
}

export default ModalAction