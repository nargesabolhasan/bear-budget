"use client";

import React from "react";
import DatePicker, { CalendarProps, DateObject } from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/prime.css";
import "react-multi-date-picker/styles/colors/green.css";

import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";

import persian_en from "react-date-object/locales/persian_en";
import gregorian_en from "react-date-object/locales/gregorian_en";

import { twMerge } from "tailwind-merge";
import { useCalenderModeStore } from "@/store/calenderSetup";

export type IDatePickerProps = Omit<CalendarProps, "value" | "onChange"> & {
  value?: string | DateObject;
  onChange?: (date: string) => void; // always returns ISO string
  placeholder?: string;
  error?: string;
};

const IDatePicker: React.FC<IDatePickerProps> = ({
  value,
  onChange,
  placeholder,
  error,
  ...props
}) => {
  const { mode } = useCalenderModeStore();
  const isJalali = mode === "jalali";

  const calendar = isJalali ? persian : gregorian;
  const locale = isJalali ? persian_en : gregorian_en;
  const format = isJalali ? "YYYY/MM/DD" : "MM/DD/YYYY";

  // Convert value to DateObject if it's an ISO string
  const pickerValue =
    typeof value === "string" && value
      ? new DateObject({ date: value, calendar, locale })
      : value || "";

  return (
    <div className="flex flex-col gap-1 w-full">
      <DatePicker
        {...props}
        className="green"
        calendar={calendar}
        locale={locale}
        format={format}
        value={pickerValue}
        currentDate={pickerValue as DateObject | undefined}
        placeholder={placeholder}
        calendarPosition="bottom-center"
        inputClass={twMerge(
          "h-[56px] p-3 rounded-2xl border border-placeholder_dark w-full bg-[var(--color-surface)]",
          error && "border-danger"
        )}
        monthYearSeparator="|"
        onChange={(date) => {
          if (!date || !date.isValid) {
            onChange?.("");
            return;
          }
          const jsDate = date.toDate();
          const isoString = jsDate.toISOString();
          onChange?.(isoString);
        }}
      />
      {error && <span className="text-red-700 text-xs">{error}</span>}
    </div>
  );
};

export default IDatePicker;
