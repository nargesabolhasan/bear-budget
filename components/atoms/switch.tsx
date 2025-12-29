import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export type ISwitchProps = {
  value: string;
  setValue: (val: string | any) => void;
  color: "primary" | "secondary";
  leftTitle: string;
  leftValue: string;
  rightTitle: string;
  rightValue: string;
};

const ISwitch = ({
  value,
  setValue,
  color = "primary",
  leftTitle,
  leftValue,
  rightTitle,
  rightValue,
}: ISwitchProps) => {
  return (
    <section className={"w-full"}>
      <ToggleButtonGroup
        className={"w-full"}
        color={color}
        value={value}
        exclusive
        onChange={(_, value) => value && setValue(value)}
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
