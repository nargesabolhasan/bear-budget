import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import ScrollDatePicker from "@/components/atoms/scrollDatePicker";
import {
  getCurrentMonthName,
  getCurrentYear,
  getYearsRange,
  PERSIAN_MONTHS,
} from "@/utils/dateList";
import IButton from "@/components/atoms/button";

type Props = {
  submitSearch: (formData: FieldValues) => void;
};

const DateFilteredTransactions = ({ submitSearch }: Props) => {
  const { setValue, watch, handleSubmit } = useForm();

  return (
    <form
      className={"flex flex-col items-center justify-center gap-3"}
      onSubmit={handleSubmit(submitSearch)}
    >
      <section
        className={
          "w-full flex flex-row items-center justify-center gap-6 md:gap-10"
        }
      >
        <ScrollDatePicker
          dateList={PERSIAN_MONTHS}
          defaultValue={getCurrentMonthName("fa")}
          title={"Month"}
          watch={watch}
          setValue={setValue}
        />
        <ScrollDatePicker
          dateList={getYearsRange("fa")}
          defaultValue={getCurrentYear("fa")}
          title={"Year"}
          watch={watch}
          setValue={setValue}
        />
      </section>
      <IButton
        type={"submit"}
        className={"!rounded-full !bg-primary_light"}
        sx={{
          fontWeight: 400,
        }}
      >
        Filter Transaction
      </IButton>
    </form>
  );
};

export default DateFilteredTransactions;
