import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";

import { useState } from "react";
import { useContext } from "react";
import { MyAuthContext } from "../context/AuthContext";

export default function AccessKeyModal({ open, onClose, onSuccess }) {
  const [key, setKey] = useState("");
  const { verifyKey } = useContext(MyAuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await verifyKey(key)
    if (result) {
      onClose();
      onSuccess();
    } else {
      alert("Hibás kulcs");
    }
  };
  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose}>
        <ModalDialog
          sx={{
            backgroundColor: "rgba(255, 36, 36, 0.096)",
            color: "white",
            border: "none",
            borderTop: "1px solid rgba(255, 143, 143, 0.322)",
            borderLeft: "1px solid rgba(255, 143, 143, 0.322)",
          }}
        >
          <DialogTitle sx={{ color: "white" }}>
            Titkos kulcs szükséges
          </DialogTitle>
          <DialogContent sx={{ color: "white" }}>
            Add meg a kulcsot a művelet folytatásához!
          </DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <Input
                  autoFocus
                  required
                  type="password"
                  placeholder="Kulcs"
                  value={key}
                  sx={{
                    color: "white",
                    width: "100%",
                    padding: "10px 20px",
                    backgroundColor: "rgba(15, 23, 42, 1)",
                    border: "none",
                    borderTop: "1px solid rgba(83, 83, 83, 0.322)",
                    borderLeft: "1px solid rgba(83, 83, 83, 0.322)",
                    borderRadius: "10px"
                    
                  }}
                  onChange={(e) => {
                    setKey(e.target.value);
                  }}
                />
              </FormControl>
              <Button
                type="submit"
                sx={{
                  userSelect: "none",
                  cursor: "pointer",
                  padding: "15px 20px",
                  background: "none",
                  zIndex: 0,
                  border: "none",
                  backgroundColor: "rgba(255, 36, 36, 0.096)",
                  width: "100%",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  outline: "none",
                  fontVariant: "small-caps",
                  fontSize: "2rem",
                  
                }}
              >
                Kulcs megadása
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
