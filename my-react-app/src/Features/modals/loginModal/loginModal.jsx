import { useState } from "react";
import { Modal, Box } from "@mui/material";
import Button from "../../../components/ui/button/Button";
import LoginForm from "../../authentication/LoginForm";
import "./LoginModal.css";

export default function LoginModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button text="Logga in" onClick={handleOpen} variant="login">
        Logga in
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box className="login-modal-box">
          <LoginForm />
        </Box>
      </Modal>
    </>
  );
}
