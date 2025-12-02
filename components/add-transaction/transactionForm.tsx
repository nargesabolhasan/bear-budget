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

const schema = yup.object({
  [FormTransactionEnum.AMOUNT]: yup.string().required("Amount is required"),
  [FormTransactionEnum.TAG]: yup.string().required("Tag is required"),
  [FormTransactionEnum.DATE]: yup.string().required("Date is required"),
  [FormTransactionEnum.DESCRIPTION]: yup
    .string()
    .max(150, "Description must be less than 150 characters"),
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
              label="Amount"
              fullWidth
              error={!!errors[FormTransactionEnum.AMOUNT]}
              helperText={errors[FormTransactionEnum.AMOUNT]?.message}
              showHint={
                watch(FormBudgetTypeEnum.AMOUNT).toString().length === 15
              }
              hint={"cannot be more that 15 character!"}
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
              placeholder={"Date"}
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
            label="Description"
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
          fontFamily: '"Inter", sans-serif !important',
        }}
      >
        Submit
      </IButton>
    </form>
  );
};

export default TransactionForm;
