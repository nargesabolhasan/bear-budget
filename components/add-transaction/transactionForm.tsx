"use client";

import React from "react";
import ITextField from "@/components/atoms/textField";
import { Controller, useForm } from "react-hook-form";
import {
  FormTransactionEnum,
  TransactionFormData,
  TransactionProps,
} from "@/components/add-transaction/type";
import { Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import IDatePicker from "@/components/atoms/datePicker";
import TagPicker from "@/components/add-transaction/tagPicker";
import { useTagsStore } from "@/store/tags";

const schema = yup.object({
  [FormTransactionEnum.AMOUNT]: yup.string().required("Amount is required"),
  [FormTransactionEnum.TAG]: yup.string().required("Tag is required"),
  [FormTransactionEnum.DATE]: yup.string().required("Date is required"),
});

const TransactionForm = ({
  submitHandler,
  ...props
}: TransactionProps & Partial<TransactionFormData>) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TransactionFormData>({
    defaultValues: {
      [FormTransactionEnum.AMOUNT]: props.amount || "",
      [FormTransactionEnum.TAG]: props.tag || "",
      [FormTransactionEnum.DATE]: props.date || "",
      [FormTransactionEnum.DESCRIPTION]: props.description || "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { tags } = useTagsStore();

  const onSubmit = (formData: TransactionFormData) => {
    submitHandler?.(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={"w-full flex flex-col gap-3 p-3"}
    >
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
                  : new Intl.NumberFormat("en-US").format(Number(value))
              }
              onChange={(e) => {
                const raw = e.target.value.replace(/,/g, "");
                const numberValue = raw === "" ? "" : Number(raw);
                onChange(numberValue);
              }}
              label="Amount"
              fullWidth
              error={!!errors[FormTransactionEnum.AMOUNT]}
              helperText={errors[FormTransactionEnum.AMOUNT]?.message}
            />
          );
        }}
      />

      <Controller
        name={FormTransactionEnum.TAG}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TagPicker
            value={field.value}
            onChange={field.onChange}
            items={tags}
          />
        )}
      />
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
            fullWidth
            error={!!errors[FormTransactionEnum.AMOUNT]}
            helperText={errors[FormTransactionEnum.AMOUNT]?.message}
          />
        )}
      />
      <Button variant={"contained"} type="submit" disabled={!isValid}>
        Submit
      </Button>
    </form>
  );
};

export default TransactionForm;
