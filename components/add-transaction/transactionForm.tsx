"use client";

import React from "react";
import ITextField from "@/components/atoms/textField";
import { Controller, useForm } from "react-hook-form";
import {
  FormTransactionEnum,
  TransactionFormData,
  TransactionProps,
} from "@/components/add-transaction/type";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import IDatePicker from "@/components/atoms/datePicker";
import { useTagsStore } from "@/store/tags";
import { convertToCurrency } from "@/utils/utils";
import useIconCount from "@/hooks/useIconCount";
import IButton from "@/components/atoms/button";
import TagAccordion from "@/components/create-budget/tagAccordion";
import { FormBudgetTypeEnum } from "@/components/create-budget/types";
import i18next from "i18next";

const schema = yup.object({
  [FormTransactionEnum.AMOUNT]: yup
    .string()
    .required(
      i18next.t("global.required", { value: i18next.t("home.amount") })
    ),
  [FormTransactionEnum.TAG]: yup
    .string()
    .required(i18next.t("global.required", { value: i18next.t("global.tag") })),
  [FormTransactionEnum.DATE]: yup
    .string()
    .required(
      i18next.t("global.required", { value: i18next.t("addTransaction.date") })
    ),
  [FormTransactionEnum.DESCRIPTION]: yup
    .string()
    .max(150, i18next.t("global.charLimit", { value: 150 })),
});

const TransactionForm = ({
  submitHandler,
  title,
  ...props
}: TransactionProps & Partial<TransactionFormData>) => {
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<TransactionFormData>({
    defaultValues: {
      [FormTransactionEnum.AMOUNT]: props.amount || "",
      [FormTransactionEnum.TAG]: props.tag || "",
      [FormTransactionEnum.DATE]: props.date || "",
      [FormTransactionEnum.DESCRIPTION]: props.description || "",
    },
    //@ts-ignore
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { tags } = useTagsStore();
  const tagsCount = useIconCount(110, ".tag-wrapper");

  const onSubmit = (formData: TransactionFormData) => {
    submitHandler?.(formData);
    //edit page dont need reset
    if (!props.tag) reset();
  };

  return (
    <form
      //@ts-ignore
      onSubmit={handleSubmit(onSubmit)}
      className={"w-full flex flex-col gap-3 p-3"}
    >
      {title && title}
      <Controller
        name={FormTransactionEnum.AMOUNT}
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
              error={!!errors[FormTransactionEnum.AMOUNT]}
              helperText={errors[FormTransactionEnum.AMOUNT]?.message}
              showHint={
                watch(FormBudgetTypeEnum.AMOUNT).toString().length === 15
              }
              hint={i18next.t("global.charLimit", { value: 15 })}
            />
          );
        }}
      />

      <TagAccordion control={control} tags={tags} tagsCount={tagsCount} />
      <Controller
        control={control}
        name="date"
        rules={{ required: true }}
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <>
            <IDatePicker
              value={value || ""}
              onChange={(date) => {
                onChange(date);
              }}
              language={"fa"}
              placeholder={i18next.t("addTransaction.date")}
              error={errors[FormTransactionEnum.DATE]?.message}
            />
          </>
        )}
      />

      <Controller
        name={FormTransactionEnum.DESCRIPTION}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <ITextField
            {...field}
            label={i18next.t("addTransaction.description")}
            multiline
            rows={3}
            fullWidth
            error={!!errors[FormTransactionEnum.DESCRIPTION]}
            helperText={errors[FormTransactionEnum.DESCRIPTION]?.message}
          />
        )}
      />
      <IButton
        variant={"contained"}
        type="submit"
        disabled={!isValid}
        size={"large"}
        className={"w-full !rounded-full"}
        sx={{
          fontWeight: 400,
          flexGrow: 1,
        }}
      >
        {i18next.t("global.submit")}
      </IButton>
    </form>
  );
};

export default TransactionForm;
