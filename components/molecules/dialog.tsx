"use client";

import React, { useRef } from "react";
import { DialogDataProps } from "@/types/global";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { closeDialog } from "@/components/molecules/dialogContainer";
import ErrorIcon from "@mui/icons-material/Error";
import IButton from "@/components/atoms/button";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const IDialog = ({
  showCancelButton = true,
  showConfirmButton = true,
  ...props
}: DialogDataProps) => {
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    nextButtonRef.current?.focus();
  }, []);

  const handleOpen = () => {
    props?.confirmHandler?.();
    closeDialog();
  };

  const handleClose = () => {
    props?.cancelHandler?.();
    closeDialog();
  };

  return (
    <Dialog
      open={true}
      slots={{
        transition: Transition,
      }}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle
        className={"flex flex-row justify-center items-center gap-2"}
      >
        <>{props.icon || <ErrorIcon color={"primary"} />}</>
        <span className={"text-primary font-bold"}>{props.title}</span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-slide-description"
          className={"text-center"}
        >
          {props.hint}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        className={"gap-2 flex flex-row !items-center !justify-center"}
      >
        {showCancelButton && (
          <IButton
            onClick={handleClose}
            ref={nextButtonRef}
            variant={"outlined"}
          >
            {props.cancelButtonText || "Cancel"}
          </IButton>
        )}
        {showConfirmButton && (
          <IButton onClick={handleOpen} variant="contained" className={"!mr-0"}>
            {props.confirmButtonText || "Confirm"}
          </IButton>
        )}
      </DialogActions>
    </Dialog>
  );
};
export default IDialog;
