import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export type ISwitchProps<T extends string> = {
  value: T;
  onChange: (val: T) => void;
  color: "primary" | "secondary";
  leftTitle: string;
  leftValue: T;
  rightTitle: string;
  rightValue: T;
};

const ISwitch = <T extends string>({
  value,
  onChange,
  color = "primary",
  leftTitle,
  leftValue,
  rightTitle,
  rightValue,
}: ISwitchProps<T>) => {
  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newValue: T | null,
  ) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <section className="w-full">
      <ToggleButtonGroup
        className="w-full"
        color={color}
        value={value}
        exclusive
        onChange={handleChange}
        sx={{
          borderRadius: "999px",
          backgroundColor: "var(--color-neutral)",
          border: "1px solid var(--color-placeholder_light)",
          p: "4px",
        }}
      >
        <ToggleButton
          value={leftValue}
          sx={{
            borderRadius: "999px",
            px: 3,
            py: 1,
            textTransform: "none",
            flex: 1,
          }}
        >
          {leftTitle}
        </ToggleButton>

        <ToggleButton
          value={rightValue}
          sx={{
            borderRadius: "999px",
            px: 3,
            py: 1,
            textTransform: "none",
            flex: 1,
          }}
        >
          {rightTitle}
        </ToggleButton>
      </ToggleButtonGroup>
    </section>
  );
};

export default ISwitch;
