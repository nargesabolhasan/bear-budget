"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import useCalendarUtils from "@/hooks/useCalendarUtils";

type FilteredDateContextType = { month: number; year: number };

type FilteredDateContextContextType = {
  date: FilteredDateContextType;
  setDate: (date: FilteredDateContextType) => void;
};

const FilteredDateContext = createContext<
  FilteredDateContextContextType | undefined
>(undefined);

export function FilteredDateProvider({ children }: { children: ReactNode }) {
  const { getCurrentYear, getCurrentMonthNumber } = useCalendarUtils();

  const [date, setDate] = useState({
    year: getCurrentYear(),
    month: getCurrentMonthNumber(),
  });

  return (
    <FilteredDateContext.Provider value={{ date, setDate }}>
      {children}
    </FilteredDateContext.Provider>
  );
}

export function useFilteredDateContext() {
  const context = useContext(FilteredDateContext);

  if (!context) {
    throw new Error(
      "useFilteredDateContext must be used within a FilteredDateProvider"
    );
  }

  return context;
}
