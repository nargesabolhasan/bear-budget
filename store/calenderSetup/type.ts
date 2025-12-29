export type Mode = "jalali" | "gregorian";

export interface ModeState {
  mode: Mode;
  setMode: (mode: Mode) => void;
}
