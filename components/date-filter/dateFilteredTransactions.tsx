"use client";
import React from "react";
import { useForm } from "react-hook-form";
import ScrollDatePicker from "@/components/atoms/scrollDatePicker";
import useCalendarUtils from "@/hooks/useCalendarUtils";
import IButton from "@/components/atoms/button";
import { useFilteredDateContext } from "@/context/filteredDateContext";
import i18next from "i18next";

export type DatePickerForm = { Month: string; Year: number };

type Props = {
  submitSearch: (formData: DatePickerForm) => void;
};

const DateFilteredTransactions = ({ submitSearch }: Props) => {
  const { setValue, watch, handleSubmit } = useForm<DatePickerForm>();
  const { setDate } = useFilteredDateContext();
  const {
    calenderMonthList,
    getCurrentMonthName,
    getYearsRange,
    getCurrentYear,
  } = useCalendarUtils();

  const submitHandler = (formDate: DatePickerForm) => {
    setDate({
      year: formDate.Year,
      month: calenderMonthList.indexOf(formDate.Month) + 1,
    });
    submitSearch(formDate);
  };

  return (
    <form
      className={"flex flex-col items-center justify-center gap-3"}
      onSubmit={handleSubmit(submitHandler)}
    >
      <section
        className={
          "w-full flex flex-row items-center justify-center gap-6 md:gap-10"
        }
      >
        <ScrollDatePicker
          dateList={calenderMonthList}
          defaultValue={getCurrentMonthName()}
          title={"Month"}
          watch={watch}
          setValue={setValue}
        />
        <ScrollDatePicker
          dateList={getYearsRange()}
          defaultValue={getCurrentYear()}
          title={"Year"}
          watch={watch}
          setValue={setValue}
        />
      </section>
      <IButton
        type={"submit"}
        className={"!rounded-full !bg-primary_light !text-dark"}
        sx={{
          fontWeight: 400,
        }}
      >
        {i18next.t("modal.filterTransaction")}
      </IButton>
    </form>
  );
};

export default DateFilteredTransactions;
