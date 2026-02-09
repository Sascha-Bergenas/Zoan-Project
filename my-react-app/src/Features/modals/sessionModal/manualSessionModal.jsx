import WorkSessionForm from "../../../Features/sessions/WorkSessionForm";
import Modal from "../../../components/ui/modal/Modal";

// Session modal komponent för att manuellt logga en arbetsession i efterhand
function ManualSessionModal({
  dialogRef,
  handleCloseModal,
}) {
  return (
    <>
      {" "}
      <Modal dialogRef={dialogRef}>
        {" "}
        <h3>Logga din session</h3> 
        <p>Input-fält för datum</p>
        <p>Input-fält för start- och stopptid</p>
        <WorkSessionForm
          handleCloseModal={handleCloseModal}
          timerData={timerData}
        />{" "}
      </Modal>{" "}
    </>
  );
}
export default SessionModal;
