import "./Modal.module.css";

function Modal({ children, dialogRef }) {
  return <dialog ref={dialogRef}>{children}</dialog>;
}
export default Modal;
