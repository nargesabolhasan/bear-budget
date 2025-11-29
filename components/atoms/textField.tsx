import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

export type TextFieldType = Omit<TextFieldProps, "variant"> & {
  hint?: string;
  showHint?: boolean;
};
const ITextField = ({ showHint, hint, ...props }: TextFieldType) => {
  return (
    <>
      <TextField
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "20px",
            backgroundColor: "white",
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
