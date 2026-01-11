export type CalendarModeUnion = "jalali" | "gregorian";

export interface ModeState {
  mode: CalendarModeUnion;
  setMode: (mode: CalendarModeUnion) => void;
}
