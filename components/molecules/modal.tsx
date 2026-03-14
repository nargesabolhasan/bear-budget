import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { ReactNode } from "react";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

const IModal = ({ open, onClose, children }: ModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "var(--color-neutral)",
          borderRadius: 15,
          boxShadow: 15,
          p: 4,
          width: "fit-content",
          height: "fit-content",
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};
export default IModal;
