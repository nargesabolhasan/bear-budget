"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { getCurrentMonthNumber, getCurrentYear } from "@/utils/dateList";

type FilteredDateContextType = { month: number; year: number };

type FilteredDateContextContextType = {
  date: FilteredDateContextType;
  setDate: (date: FilteredDateContextType) => void;
};

const FilteredDateContext = createContext<FilteredDateContextContextType>({
  date: { year: getCurrentYear("fa"), month: getCurrentMonthNumber("fa") },
  setDate: () => {},
});

export function FilteredDateProvider({ children }: { children: ReactNode }) {
  const [date, setDate] = useState<FilteredDateContextType>({
    year: getCurrentYear("fa"),
    month: getCurrentMonthNumber("fa"),
  });

  return (
    <FilteredDateContext.Provider value={{ date, setDate }}>
      {children}
    </FilteredDateContext.Provider>
  );
}

export function useFilteredDateContext() {
  return useContext(FilteredDateContext);
}
