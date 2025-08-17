"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import { DialogDataProps, OpenDialogFunc } from "@/types/global";

export let closeDialog: () => void = () => {};
export let openDialog: OpenDialogFunc = () => {};

const DialogContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialog, setDialog] = useState<DialogDataProps | {}>();

  useEffect(() => {
    openDialog = (data) => {
      setIsOpen(true);
      setDialog(data);
    };
    closeDialog = () => {
      setIsOpen(false);
      setDialog({});
    };
  }, []);

  const Component = isOpen ? lazy(() => import("./dialog")) : undefined;
  return (
    <Suspense>
      {Component && <Component {...(dialog as DialogDataProps)} />}
    </Suspense>
  );
};

export default DialogContainer;
