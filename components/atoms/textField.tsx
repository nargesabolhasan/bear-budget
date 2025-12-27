import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import i18n from "i18next";

export type TextFieldType = Omit<TextFieldProps, "variant"> & {
  hint?: string;
  showHint?: boolean;
  borderRadius?: string;
};
const ITextField = ({
  borderRadius,
  showHint,
  hint,
  ...props
}: TextFieldType) => {
  return (
    <>
      <TextField
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: borderRadius ?? "20px",
            backgroundColor: "var(--color-surface)",
          },
          "& .MuiOutlinedInput-notchedOutline legend": {
            marginRight: i18n.dir() === "rtl" ? "-16px" : 0,
          },
        }}
        {...props}
        dir="rtl"
      />

      {showHint && <p className="text-xs text-placeholder">{hint}</p>}
    </>
  );
};

export default ITextField;
