import React from "react";
import { Button, ButtonProps } from "@mui/material";
import twMerge from "@/utils/utils";

export type SizeButtonProps = "small" | "medium" | "large";
export type VariantButtonProps = "outlined" | "contained" | "text";
export type ColorButtonProps = "primary" | "secondary" | "disabled";

export type IButtonProps = Omit<ButtonProps, "variant" | "color" | "size"> & {
  children?: React.ReactNode;
  variant?: VariantButtonProps;
  size?: SizeButtonProps;
  color?: ColorButtonProps;
};
const IButton = ({
  children,
  variant = "contained",
  size = "medium",
  color = "primary",
  ...props
}: IButtonProps) => {
  const variantMapper: Record<VariantButtonProps, string> = {
    outlined: "!bg-transparent",
    contained: "!border-none",
    text: "!bg-transparent !border-none",
  };
  const colorMapper: Record<ColorButtonProps, string> = {
    primary: "!bg-primary !border !border-primary !text-primary",
    secondary: "!bg-secondary !border !border-secondary !text-secondary",
    disabled:
      "!bg-placeholder_light !border !border-placeholder_light !text-placeholder_light",
  };
  const sizeMapper: Record<SizeButtonProps, string> = {
    small: "w-[40px] !text-xs",
    medium: "w-[80px] !text-md",
    large: "w-[150] !text-lg",
  };
  return (
    <Button
      {...props}
      className={twMerge(
        colorMapper[color],
        sizeMapper[size],
        variantMapper[variant]
      )}
    >
      {children}
    </Button>
  );
};

export default IButton;
