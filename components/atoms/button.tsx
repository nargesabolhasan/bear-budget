import React from "react";
import { Button, ButtonProps } from "@mui/material";

export type IButtonColor = "primary" | "secondary" | "danger" | "warning";
export type IButtonSize = "small" | "medium" | "large";

interface IButtonProps extends Omit<ButtonProps, "color" | "size"> {
  colorType?: IButtonColor;
  sizeType?: IButtonSize;
  children: React.ReactNode;
}

const IButton: React.FC<IButtonProps> = ({
  colorType = "primary",
  variant = "contained",
  sizeType = "medium",
  children,
  ...props
}) => {
  return (
    <Button {...props} color={colorType} variant={variant} size={sizeType}>
      {children}
    </Button>
  );
};

export default IButton;
