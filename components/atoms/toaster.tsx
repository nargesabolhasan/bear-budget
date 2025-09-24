"use client";

import { Toaster } from "sonner";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";

export default function GlobalToaster() {
  return (
    <Toaster
      position="top-center"
      closeButton={true}
      toastOptions={{
        classNames: {
          toast: "toast",
          title: "title",
          icon: "!text-primary",
          error: "error !bg-danger_light",
        },
      }}
      icons={{
        error: <ErrorTwoToneIcon color={"error"} />,
      }}
    />
  );
}
