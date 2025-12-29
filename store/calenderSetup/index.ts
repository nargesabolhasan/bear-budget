import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ModeState } from "@/store/calenderSetup/type";

export const useCalenderModeStore = create(
  persist<ModeState>(
    (set) => ({
      mode: "gregorian",
      setMode: (mode) => set({ mode }),
    }),
    { name: "calendar-mode" }
  )
);
