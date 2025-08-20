"use client";
import React from "react";
import DatePicker, { CalendarProps, DateObject } from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/prime.css";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import twMerge from "@/libs/utils";

export type IDatePickerProps = Omit<CalendarProps, "value" | "onChange"> & {
  value?: DateObject | string;
  onChange?: (date: DateObject | string) => void;
  placeholder?: string;
  language?: "en" | "fa";
  error?: string | undefined;
};

const IDatePicker: React.FC<IDatePickerProps> = ({
  value,
  onChange,
  placeholder,
  language = "en",
  error,
  ...props
}) => {
  return (
    <div className={"flex flex-col gap-1"}>
      <DatePicker
        {...props}
        inputClass={twMerge(
          "h-[56px] p-3 rounded-sm border border-grey-400 w-full",
          "h-[56px] p-3 rounded-sm border-gray-300 w-full",
          !!error && "border border-red-700"
        )}
        monthYearSeparator="|"
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(date) => {
          onChange?.(date?.isValid ? date : "");
        }}
        format={language === "en" ? "MM/DD/YYYY" : "YYYY/MM/DD"}
        currentDate={value}
        {...(language === "fa"
          ? {
              calendar: persian,
              locale: persian_fa,
            }
          : {})}
      />
      {!!error && <span className={"text-red-700 text-xs"}>{error}</span>}
    </div>
  );
};

export default IDatePicker;
