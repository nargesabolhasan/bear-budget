"use client";
import React from "react";
import ScrollDatePicker from "@/components/atoms/scrollDatePicker";
import {
  getCurrentMonthName,
  getCurrentYear,
  PERSIAN_MONTHS,
} from "@/utils/dateList";
import { Controller, useForm } from "react-hook-form";
import { useTagsStore } from "@/store/tags";
import { twMerge } from "tailwind-merge";
import IButton from "@/components/atoms/button";
import ITextField from "@/components/atoms/textField";
import { convertToCurrency } from "@/utils/utils";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useIconCount from "@/hooks/useIconCount";
import TagAccordion from "@/components/create-budget/tagAccordion";
import { FormBudgetTypeEnum } from "@/components/create-budget/types";
import { BudgetType } from "@/types/global";

type Props = {
  onSubmit: (data: Omit<BudgetType, "id">) => void;
  defaultValue?: Omit<BudgetType, "id">;
};

const CreateBudget = ({ onSubmit, defaultValue }: Props) => {
  const { tags } = useTagsStore();
  const tagsCount = useIconCount(100, ".tag-wrapper");

  const schema = yup.object({
    [FormBudgetTypeEnum.AMOUNT]: yup.string().required("Amount is required"),
    [FormBudgetTypeEnum.MONTH]: yup.string().required("Month is required"),
    [FormBudgetTypeEnum.TAG]: yup.string().required("Tag is required"),
  });

  const {
    control,
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<Omit<BudgetType, "id">>({
    defaultValues: {
      [FormBudgetTypeEnum.AMOUNT]: defaultValue?.amount || "",
      [FormBudgetTypeEnum.MONTH]:
        defaultValue?.month || getCurrentMonthName("fa"),
      [FormBudgetTypeEnum.TAG]: defaultValue?.tag,
    },
    //@ts-ignore
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmitHandler = (formData: Omit<BudgetType, "id">) => {
    onSubmit(formData);
    //edit page dont need reset
    if (!defaultValue) reset();
  };

  return (
    <form
      className="w-full md:w-2/3 lg:w-1/3 mx-auto flex flex-col gap-1 p-8 mb-5"
      //@ts-ignore
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      {/*-------month---------*/}
      <span className={"w-full font-bold mt-3 text-start"}>
        Choose a month:{" "}
        <span className={"text-placeholder text-sm"}>
          (in the year {getCurrentYear("fa")})
        </span>
      </span>
      <div className="flex flex-col items-center justify-center w-full bg-white p-3 rounded-3xl border border-placeholder_light">
        <ScrollDatePicker
          dateList={PERSIAN_MONTHS}
          defaultValue={defaultValue?.month || getCurrentMonthName("fa")}
          title={FormBudgetTypeEnum.MONTH}
          watch={watch}
          setValue={setValue}
          showTitle={false}
        />
      </div>

      {/*-------tag---------*/}
      <span className={"w-full md:w-1/2 font-bold my-2 text-start"}>
        Choose a tag :
      </span>
      <TagAccordion control={control} tags={tags} tagsCount={tagsCount} />
      {/*-------budget------*/}
      <span className={"w-full md:w-1/2 font-bold my-2 text-start"}>
        Budget amount:
      </span>
      <Controller
        name={FormBudgetTypeEnum.AMOUNT}
        control={control}
        defaultValue=""
        render={({ field }) => {
          const { onChange, value, ...rest } = field;
          return (
            <ITextField
              {...rest}
              value={
                value === "" || value === null
                  ? ""
                  : convertToCurrency(Number(value))
              }
              onChange={(e) => {
                const raw = e.target.value.replace(/,/g, "");
                if (raw.length > 15) {
                  return;
                }
                const numberValue = raw === "" ? "" : Number(raw);
                onChange(numberValue);
              }}
              label="Amount"
              fullWidth
              error={!!errors[FormBudgetTypeEnum.AMOUNT]}
              helperText={errors[FormBudgetTypeEnum.AMOUNT]?.message}
              showHint={
                watch(FormBudgetTypeEnum.AMOUNT).toString().length === 15
              }
              hint={"cannot be more that 15 character!"}
            />
          );
        }}
      />
      <IButton
        type={"submit"}
        disabled={!isValid}
        size={"large"}
        className={twMerge("!mt-4 w-full !border-4")}
      >
        Create Budget
      </IButton>
    </form>
  );
};

export default CreateBudget;
