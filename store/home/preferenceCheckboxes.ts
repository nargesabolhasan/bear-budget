import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TargetType, TargetUnion } from "./type";

export interface FeaturePreferenceStore {
  saveTarget: TargetType;
  debtTarget: TargetType;
  creditTarget: TargetType;

  setPreference: (key: TargetUnion, value: TargetType) => void;
}

export const useFeaturePreferenceStore = create<FeaturePreferenceStore>()(
  persist(
    (set) => ({
      saveTarget: null,
      debtTarget: null,
      creditTarget: null,

      setPreference: (key, value) =>
        set((state) => ({
          ...state,
          [key]: value,
        })),
    }),
    {
      name: "financial-mapping-preferences",
    },
  ),
);
