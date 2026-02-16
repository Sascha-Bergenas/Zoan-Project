import type {ReactNode, RefObject} from "react"
import "./Modal.module.css";

type ModalProps = {
  children: ReactNode
  dialogRef: RefObject<HTMLDialogElement | null>
}

function Modal({ children, dialogRef }: ModalProps) {
  return <dialog ref={dialogRef}>{children}</dialog>;
}

export default Modal;
