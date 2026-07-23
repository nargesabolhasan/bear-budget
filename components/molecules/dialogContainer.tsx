"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import { DialogDataProps, OpenDialogFunc } from "@/types/global";

export let closeDialog: () => void = () => {};
export let openDialog: OpenDialogFunc = () => {};

const DialogContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialog, setDialog] = useState<DialogDataProps | null>(null);

  useEffect(() => {
    openDialog = (data) => {
      setDialog(data);
      setIsOpen(true);
    };

    closeDialog = () => {
      setIsOpen(false);
      setDialog(null);
    };
  }, []);

  const Component = isOpen ? lazy(() => import("./dialog")) : undefined;

  return (
    <Suspense>{Component && dialog && <Component {...dialog} />}</Suspense>
  );
};

export default DialogContainer;
