import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

export type TextFieldType = Omit<TextFieldProps, "variant"> & {};

const ITextField = ({ ...props }: TextFieldType) => {
  return <TextField variant={"outlined"} {...props} dir={"rtl"} />;
};

export default ITextField;
