import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import persian_fa from "react-date-object/locales/persian_fa";

export const getYearsRange = (lang: "fa" | "en" = "en") => {
  let currentYear;
  if (lang === "fa") {
    const persianYear = new Intl.DateTimeFormat("fa-IR-u-ca-persian-nu-latn", {
      year: "numeric",
    }).format(new Date());
    currentYear = parseInt(persianYear);
  } else {
    currentYear = new Date().getFullYear();
  }
  const start = lang === "fa" ? 1404 : 2025;
  const end = currentYear + 5;

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export const getCurrentYear = (lang: "fa" | "en" = "en"): number => {
  const now = new Date();
  if (lang === "fa") {
    const persianYear = new Intl.DateTimeFormat("fa-IR-u-ca-persian-nu-latn", {
      year: "numeric",
    }).format(new Date());
    return parseInt(persianYear);
  } else {
    return now.getFullYear();
  }
};

export const getCurrentMonthName = (locale: "fa" | "en" = "en"): string => {
  const now = new Date();
  return new Intl.DateTimeFormat(locale, { month: "long" }).format(now);
};

export const getCurrentMonthNumber = (locale: "fa" | "en" = "en"): number => {
  const now = new DateObject({
    date: new Date(),
    calendar: locale === "fa" ? persian : gregorian,
  });
  return now.month.number;
};

type Language = "fa" | "en";

export const formatDate = (
  value: string | number | Date,
  lang: Language = "en"
): string => {
  const calendar = lang === "fa" ? persian : gregorian;
  const locale = lang === "fa" ? persian_fa : gregorian_en;

  return new DateObject({
    date: value,
    calendar,
    locale,
  }).format("dddd D MMMM YYYY");
};

export const MONTHS = [
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

export const PERSIAN_MONTHS = [
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
