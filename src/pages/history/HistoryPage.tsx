import { useState, useEffect, useRef } from "react";
import { SessionsProvider } from "../../contexts/sessions/SessionsProvider";
import styles from "./HistoryPage.module.css";
import List from "../../components/ui/lists/List";
import BaseCard from "../../components/ui/cards/Card"
import Button from "../../components/ui/button/Button";
import EditSessionModal from "../../Features/modals/editSessionModal/editSessionModal";
import { useAuth } from "../../contexts/useAuth";
// import getSessions from "../../supabase/getSessions";
import Graph from "../../Features/graph/graph";
import useSessions from "../../contexts/sessions/useSessions";

// Inside the inner component (or extract one), consume context:
function HistoryContent() {
  const { sessions } = useSessions();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleAddClick = () => {
    dialogRef.current?.showModal();
  };

  return (
    <>
      <h2 className="text-lg">Statserinos</h2>
      <section className={styles.wrapper}>
        <div className={styles.container}>
          <h3>Loggade sessioner</h3>
          <EditSessionModal mode="new" dialogRef={dialogRef} />
          <Button text={"Lägg till"} variant="secondary" onClick={handleAddClick} />
          <BaseCard className={""} size={""}>
            <List />
          </BaseCard>
        </div>
      </section>
      <Graph sessions={sessions} />
    </>
  );
}

export default function History() {
  return (
    <SessionsProvider>
      <HistoryContent />
    </SessionsProvider>
  );
}