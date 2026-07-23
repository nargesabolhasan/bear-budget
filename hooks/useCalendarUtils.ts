"use client";

import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import persian_fa from "react-date-object/locales/persian_fa";
import { useCalenderModeStore } from "@/store/calenderSetup";

const useCalendarUtils = () => {
  const { mode } = useCalenderModeStore();
  const isJalali = mode === "jalali";

  const lang = isJalali ? "fa" : "en";
  const calendar = isJalali ? persian : gregorian;
  const locale = isJalali ? persian_fa : gregorian_en;

  /* ---------------- Years ---------------- */

  const getCurrentYear = (): number => {
    if (isJalali) {
      const persianYear = new Intl.DateTimeFormat(
        "fa-IR-u-ca-persian-nu-latn",
        { year: "numeric" },
      ).format(new Date());

      return parseInt(persianYear);
    }

    return new Date().getFullYear();
  };

  const getYearsRange = (): number[] => {
    const currentYear = getCurrentYear();
    const start = isJalali ? 1404 : 2025;
    const end = currentYear + 5;

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  /* ---------------- Months ---------------- */

  const getCurrentMonthName = (): string => {
    return new Intl.DateTimeFormat(lang, { month: "long" }).format(new Date());
  };

  const getCurrentMonthNumber = (): number => {
    const now = new DateObject({
      date: new Date(),
      calendar,
    });

    return now.month.number;
  };

  const getPreviousMonth = (
    currentMonth: number = getCurrentMonthNumber(),
    currentYear: number = getCurrentYear(),
  ) => {
    let previousYear = currentYear;
    let previousMonth = currentMonth;

    if (currentMonth === 1) {
      previousYear = currentYear - 1;
      previousMonth = 12;
    } else {
      previousMonth = currentMonth - 1;
    }

    const isoDate = toStandardISO({
      year: previousYear,
      month: previousMonth,
    });

    return {
      // Current calendar system (Jalali/Gregorian)
      year: previousYear,
      month: previousMonth,

      // Real Gregorian date used in transaction store
      isoYear: isoDate.year,
      isoMonth: isoDate.month,

      // Needed for Jalali filtering in getTransactions
      notIsoMonth: previousMonth,
    };
  };
  /* ---------------- Date format ---------------- */

  const formatDate = (
    value: string | number | Date,
    format: boolean = false,
  ): string => {
    const formatType = isJalali ? "YYYY/MM/DD" : "MM/DD/YYYY";
    const date = new DateObject({
      date: value,
      calendar,
      locale,
    });

    return date.format(format ? formatType : "dddd D MMMM YYYY");
  };

  const formatSearchDate = (value?: string | number | Date): string => {
    if (!value) return "";

    const date = new DateObject({
      date: value,
      calendar,
      locale,
    });

    return date.format("YYYY/MM/DD");
  };
  /* ---------------- ISO Conversion ---------------- */

  /**
   * Convert selected year/month in a given mode (Jalali or Gregorian)
   * to canonical Gregorian year/month.
   */

  function toStandardISO({ year, month }: { year: number; month: number }) {
    const firstOfMonth = new DateObject({
      year,
      month,
      day: 1,
      calendar: calendar,
    });

    const gregorianDate = firstOfMonth.convert(gregorian);

    return {
      year: gregorianDate.year,
      month: gregorianDate.month.number,
    };
  }

  /* ---------------- Constants ---------------- */

  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const PERSIAN_MONTHS = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  return {
    isJalali,
    lang,
    getCurrentYear,
    getYearsRange,
    getCurrentMonthName,
    getCurrentMonthNumber,
    formatDate,
    formatSearchDate,
    toStandardISO,
    getPreviousMonth,
    calenderMonthList: isJalali ? PERSIAN_MONTHS : MONTHS,
  };
};

export default useCalendarUtils;
