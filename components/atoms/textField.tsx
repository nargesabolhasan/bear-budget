import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

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
        }}
        {...props}
        dir="rtl"
      />

      {showHint && <p className="text-xs text-placeholder">{hint}</p>}
    </>
  );
};

export default ITextField;
