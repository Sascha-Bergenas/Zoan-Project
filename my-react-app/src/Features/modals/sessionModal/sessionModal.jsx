import WorkSessionForm from "../../../Features/sessions/WorkSessionForm";
import Modal from "../../../components/ui/modal/Modal";

// Session modal komponent för att logga en arbetsession vid timer stopp och stänga modalen
function SessionModal({
  dialogRef,
  handleCloseModal,
  handleSessionSaved,
  stopTimeFormatted,
  timerData,
}) {
  return (
    <>
      {" "}
      <Modal dialogRef={dialogRef}>
        {" "}
        <h3>Logga din session</h3> <p>Sessionens längd: {stopTimeFormatted}</p>{" "}
        {/* {console.log(timerData)} */}
        <WorkSessionForm
          handleCloseModal={handleCloseModal}
          handleSessionSaved={handleSessionSaved}
          timerData={timerData}
        />{" "}
      </Modal>{" "}
    </>
  );
}
export default SessionModal;

 