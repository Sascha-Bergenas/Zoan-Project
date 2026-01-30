import WorkSessionForm from "../../ui/form/WorkSessionForm";
import Modal from "../../ui/modal/Modal";

// Session modal komponent för att logga en arbetsession vid timer stopp och stänga modalen
function SessionModal({ dialogRef, handleCloseModal, stopTimeFormatted }) {
  return (
    <>
      <Modal dialogRef={dialogRef}>
        <h3>Logga din session</h3>
        <p>Sessionens längd: {stopTimeFormatted}</p>
        <WorkSessionForm handleCloseModal={handleCloseModal} />
      </Modal>
    </>
  );
}
export default SessionModal;
