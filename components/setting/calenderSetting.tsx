import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useCalenderModeStore } from "@/store/calenderSetup";

const CalenderSetting: React.FC = () => {
  const { mode, setMode } = useCalenderModeStore();

  return (
    <ToggleButtonGroup
      color={"primary"}
      value={mode}
      exclusive
      onChange={(_, value) => value && setMode(value)}
      sx={{
        borderRadius: "999px",
        backgroundColor: "#f1f5f9",
        p: "4px",
      }}
    >
      <ToggleButton
        value="jalali"
        sx={{
          borderRadius: "999px",
          px: 3,
          textTransform: "none",
        }}
      >
        jalali
      </ToggleButton>

      <ToggleButton
        value="gregorian"
        sx={{
          borderRadius: "999px",
          px: 3,
          textTransform: "none",
        }}
      >
        gregorian
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default CalenderSetting;
