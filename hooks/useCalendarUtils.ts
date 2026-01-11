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
        { year: "numeric" }
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

  /* ---------------- Date format ---------------- */

  const formatDate = (
    value: string | number | Date,
    format: boolean = false
  ): string => {
    const formatType = isJalali ? "YYYY/MM/DD" : "MM/DD/YYYY";
    const date = new DateObject({
      date: value,
      calendar,
      locale,
    });

    return date.format(format ? formatType : "dddd D MMMM YYYY");
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
    toStandardISO,
    calenderMonthList: isJalali ? PERSIAN_MONTHS : MONTHS,
  };
};

export default useCalendarUtils;
