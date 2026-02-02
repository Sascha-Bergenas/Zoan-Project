import WorkSessionForm from "../../ui/form/WorkSessionForm";
import Modal from "../../ui/modal/Modal";

// Session modal komponent för att logga en arbetsession vid timer stopp och stänga modalen
function SessionModal({ dialogRef, handleCloseModal, stopTimeFormatted, timerData}) {
  return (
    <>
      {" "}
      <Modal dialogRef={dialogRef}>
        {" "}
        <h3>Logga din session</h3> <p>Sessionens längd: {stopTimeFormatted}</p>{" "}
        <WorkSessionForm handleCloseModal={handleCloseModal} timerData={timerData} />{" "}
      </Modal>{" "}
    </>
  );
}
export default SessionModal;
