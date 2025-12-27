import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { twMerge } from "tailwind-merge";

export type SizeButtonProps = "small" | "medium" | "large";
export type VariantButtonProps = "outlined" | "contained" | "text";
export type ColorButtonProps = "primary" | "secondary" | "disabled";

export type IButtonProps = Omit<ButtonProps, "variant" | "color" | "size"> & {
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
    outlined: "!bg-neutral",
    contained: "!border-none",
    text: "!bg-transparent !border-none",
  };
  const colorMapper: Record<ColorButtonProps, string> = {
    primary: "!bg-primary !border !border-primary !text-inherit",
    secondary: "!bg-secondary !border !border-secondary !text-inherit",
    disabled:
      "!bg-placeholder_light !border !border-placeholder_light opacity-80",
  };
  const sizeMapper: Record<SizeButtonProps, string> = {
    small: "!px-5 min-h-[30px] !text-xs",
    medium: "!px-10 min-h-[40px] !text-md",
    large: "!px-14 min-h-[50px] !text-lg",
  };
  return (
    <Button
      {...props}
      className={twMerge(
        "w-fit !rounded-full",
        props.disabled ? colorMapper.disabled : colorMapper[color],
        sizeMapper[size],
        variantMapper[variant],
        props.className
      )}
      sx={{
        fontWeight: 400,
        textTransform: "none",
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
};

export default IButton;
