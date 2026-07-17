import { Close } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import { ReactNode } from "react";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  showCloseButton?: boolean;
};

const IModal = ({
  open,
  onClose,
  children,
  showCloseButton = false,
}: ModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        className="flex flex-col items-end gap-2"
        sx={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "var(--color-neutral)",
          borderRadius: 10,
          boxShadow: 15,
          p: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          width: "fit-content",
          height: "fit-content",
          position: "relative",
        }}
      >
        {showCloseButton && (
          <IconButton
            onClick={onClose}
            sx={{
              border: "2px solid var(--color-primary)",
              borderRadius: "50%",
            }}
          >
            <Close />
          </IconButton>
        )}

        {children}
      </Box>
    </Modal>
  );
};

export default IModal;
