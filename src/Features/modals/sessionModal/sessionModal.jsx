import WorkSessionForm from "../../sessions/WorkSessionForm";
import Modal from "../../../components/ui/modal/Modal";
import styles from "./sessionModal.module.css";

// Session modal komponent för att logga en arbetsession vid timer stopp och stänga modalen
function SessionModal({
  dialogRef,
  handleCloseModal,
  stopTimeFormatted,
  timerData
}) {
  return (
    <>
      <Modal dialogRef={dialogRef} className={styles.sessionWrapper}>
          {" "}
          <h3 className={styles.modalHeader}>Logga din session</h3>{" "}
          <p className={styles.sessionTime}>
            Sessionens längd: {stopTimeFormatted}
          </p>{" "}
          <WorkSessionForm
            handleCloseModal={handleCloseModal}
            timerData={timerData}
          />{" "}
      </Modal>{" "}

    </>
  );
}
export default SessionModal;
