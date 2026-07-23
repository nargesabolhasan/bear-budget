"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import useCalendarUtils from "@/hooks/useCalendarUtils";

export type FilteredDateContextType = {
  month: number;
  year: number;
  notIso: { year: number; month: number; monthName: string };
};

type FilteredDateContextContextType = {
  date: FilteredDateContextType;
  saveDate: (date: { month: number; monthName: string; year: number }) => void;
};

const FilteredDateContext = createContext<
  FilteredDateContextContextType | undefined
>(undefined);

export function FilteredDateProvider({ children }: { children: ReactNode }) {
  const { getCurrentYear, getCurrentMonthNumber, getCurrentMonthName } =
    useCalendarUtils();

  const { toStandardISO, isJalali } = useCalendarUtils();

  const [date, setDate] = useState({
    year: 0,
    month: 0,
    notIso: {
      year: 0,
      month: 0,
      monthName: "",
    },
  });

  useEffect(() => {
    setDate({
      ...toStandardISO({
        year: getCurrentYear(),
        month: getCurrentMonthNumber(),
      }),
      notIso: {
        year: getCurrentYear(),
        month: getCurrentMonthNumber(),
        monthName: getCurrentMonthName(),
      },
    });
  }, [isJalali]);

  return (
    <FilteredDateContext.Provider
      value={{
        date,
        saveDate: (value) =>
          setDate({
            ...toStandardISO(value),
            notIso: {
              month: value.month,
              year: value.year,
              monthName: value.monthName,
            },
          }),
      }}
    >
      {children}
    </FilteredDateContext.Provider>
  );
}

export function useFilteredDateContext() {
  const context = useContext(FilteredDateContext);

  if (!context) {
    throw new Error(
      "useFilteredDateContext must be used within a FilteredDateProvider",
    );
  }

  return context;
}
