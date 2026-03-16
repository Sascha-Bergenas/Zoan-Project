import type { ReactNode, RefObject } from "react";
import "./Modal.module.css";

type ModalProps = {
  children: ReactNode;
  dialogRef: RefObject<HTMLDialogElement | null>;
  onClose?: () => void;
  className?: string;
};

function Modal({ children, dialogRef, onClose, className }: ModalProps) {
  return (
    <dialog ref={dialogRef} onClose={onClose} className={className}>
      {children}
    </dialog>
  );
}

export default Modal;
