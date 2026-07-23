"use client";
import React from "react";
import ScrollDatePicker from "@/components/atoms/scrollDatePicker";
import { Controller, useForm } from "react-hook-form";
import { useTagsStore } from "@/store/tags";
import { twMerge } from "tailwind-merge";
import IButton from "@/components/atoms/button";
import ITextField from "@/components/atoms/textField";
import { convertToCurrency } from "@/utils/utils";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useIconCount from "@/hooks/useIconCount";
import TagAccordion from "@/components/core-components/create-budget/tagAccordion";
import { FormBudgetTypeEnum } from "@/components/core-components/create-budget/types";
import { BudgetFormType, BudgetType } from "@/types/global";
import i18next from "i18next";
import useCalendarUtils from "@/hooks/useCalendarUtils";

type Props = {
  onSubmit: (data: BudgetType) => void;
  defaultValue?: BudgetType;
};

const CreateBudget = ({ onSubmit, defaultValue }: Props) => {
  const { tags } = useTagsStore();
  const tagsCount = useIconCount(100, ".tag-wrapper");
  const {
    calenderMonthList,
    getCurrentMonthName,
    getCurrentYear,
    toStandardISO,
    isJalali,
    getCurrentMonthNumber,
  } = useCalendarUtils();

  const index = isJalali ? defaultValue?.month : defaultValue?.isoMonth;

  const defaultMonth = index
    ? calenderMonthList[(index ?? 0) - 1]
    : calenderMonthList[getCurrentMonthNumber() - 1];

  const schema = yup.object({
    [FormBudgetTypeEnum.AMOUNT]: yup
      .string()
      .required(
        i18next.t("global.required", { value: i18next.t("home.amount") }),
      ),
    [FormBudgetTypeEnum.MONTH]: yup
      .string()
      .required(
        i18next.t("global.required", { value: i18next.t("modal.month") }),
      ),
    [FormBudgetTypeEnum.TAG]: yup
      .string()
      .required(
        i18next.t("global.required", { value: i18next.t("global.tag") }),
      ),
  });

  const {
    control,
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<BudgetFormType>({
    defaultValues: {
      [FormBudgetTypeEnum.AMOUNT]: defaultValue?.amount || "",
      [FormBudgetTypeEnum.MONTH]: defaultMonth,
      [FormBudgetTypeEnum.TAG]: defaultValue?.tag,
    },
    //@ts-ignore
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmitHandler = (formData: BudgetFormType) => {
    const numericMonth = calenderMonthList.indexOf(formData.month) + 1;
    const isoDate = toStandardISO({
      year: getCurrentYear(),
      month: numericMonth,
    });

    onSubmit({
      ...formData,
      month: numericMonth,
      isoMonth: isoDate.month,
    });
    //edit page dont need reset
    if (!defaultValue) reset();
  };

  return (
    <form
      className="mx-auto mb-5 flex w-full flex-col gap-1 p-8 md:w-2/3 lg:w-1/3"
      //@ts-ignore
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      {/*-------month---------*/}
      <span className={"mt-3 w-full text-start font-bold"}>
        {i18next.t("helperButtons.selectMonth")}{" "}
        <span className={"text-placeholder text-sm"}>
          ({i18next.t("createBudget.inTheYear")} {getCurrentYear()})
        </span>{" "}
        :
      </span>
      <div className="bg-surface border-placeholder_light flex w-full flex-col items-center justify-center rounded-3xl border p-3">
        <ScrollDatePicker
          dateList={calenderMonthList}
          defaultValue={defaultMonth || getCurrentMonthName()}
          title={FormBudgetTypeEnum.MONTH}
          watch={watch}
          setValue={setValue}
          showTitle={false}
        />
      </div>

      {/*-------tag---------*/}
      <span className={"my-2 w-full text-start font-bold md:w-1/2"}>
        {i18next.t("addTransaction.selectTag")}:
      </span>
      <TagAccordion control={control} tags={tags} tagsCount={tagsCount} />
      {/*-------budget------*/}
      <span className={"my-2 w-full text-start font-bold md:w-1/2"}>
        {i18next.t("createBudget.budgetAmount")}:
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
              label={i18next.t("home.amount")}
              fullWidth
              error={!!errors[FormBudgetTypeEnum.AMOUNT]}
              helperText={errors[FormBudgetTypeEnum.AMOUNT]?.message}
              showHint={
                watch(FormBudgetTypeEnum.AMOUNT).toString().length === 15
              }
              hint={i18next.t("global.charLimit", { value: 15 })}
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
        {i18next.t("global.submit")}
      </IButton>
    </form>
  );
};

export default CreateBudget;
