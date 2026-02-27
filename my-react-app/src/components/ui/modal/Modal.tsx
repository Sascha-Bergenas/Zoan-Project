import type {ReactNode, RefObject} from "react"
import "./Modal.module.css";

type ModalProps = {
  children: ReactNode
  dialogRef: RefObject<HTMLDialogElement | null>
  onClose?: () => void
}

function Modal({ children, dialogRef, onClose }: ModalProps) {
  return (
    <dialog ref={dialogRef} onClose={onClose}>
      {children}
    </dialog>
  );
}

export default Modal;
