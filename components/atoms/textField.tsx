import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

export type TextFieldType = Omit<TextFieldProps, "variant"> & {
  hint?: string;
  showhint?: boolean;
};

const ITextField = ({ ...props }: TextFieldType) => {
  return (
    <>
      <TextField
        variant={"outlined"}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "20px",
            backgroundColor: "white",
          },
        }}
        {...props}
        dir={"rtl"}
      />

      {props.showhint && (
        <p className={"text-xs text-placeholder"}>{props.hint}</p>
      )}
    </>
  );
};

export default ITextField;
