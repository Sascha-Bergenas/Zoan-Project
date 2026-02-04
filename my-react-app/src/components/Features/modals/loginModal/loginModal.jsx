import { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import Button from "../../../ui/Button";
import LoginForm from "../../../ui/form/LoginForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

export default function LoginModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button text="Logga in" onClick={handleOpen}>
        Logga in
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography>
            <LoginForm />
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
