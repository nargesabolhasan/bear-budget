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
import TagPicker from "@/components/add-transaction/tagPicker";
import { useTagsStore } from "@/store/tags";
import { convertToCurrency } from "@/utils/utils";
import IAccordion from "@/components/molecules/accordion";
import useIconCount from "@/hooks/useIconCount";
import IButton from "@/components/atoms/button";
import { Render } from "@/utils/render";

const schema = yup.object({
  [FormTransactionEnum.AMOUNT]: yup.string().required("Amount is required"),
  [FormTransactionEnum.TAG]: yup.string().required("Tag is required"),
  [FormTransactionEnum.DATE]: yup.string().required("Date is required"),
});

const TransactionForm = ({
  submitHandler,
  title,
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
  const tagsCount = useIconCount(110, ".tag-wrapper");

  const accordionItem = [
    {
      id: 1,
      panel: "tag-picker",
      panelHeaderId: "tag-picker-header",
      ariaControl: "tag-picker-aria",
      summary: (
        <div className={"h-full w-full flex flex-col gap-3"}>
          <h4 className={"text-placeholder"}>select tag</h4>
          <Controller
            name={FormTransactionEnum.TAG}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TagPicker
                value={field.value}
                onChange={field.onChange}
                tagList={tags.slice(0, tagsCount)}
              />
            )}
          />
        </div>
      ),
      detail: (
        <>
          {tags.slice(tagsCount).length !== 0 && (
            <Controller
              name={FormTransactionEnum.TAG}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TagPicker
                  value={field.value}
                  onChange={field.onChange}
                  tagList={tags.slice(tagsCount)}
                />
              )}
            />
          )}
        </>
      ),
    },
  ];

  const onSubmit = (formData: TransactionFormData) => {
    submitHandler?.(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={"w-full flex flex-col gap-3 p-3"}
    >
      <Render
        when={!!title}
        fallback={<h4 className={"text-center"}>Add new Transaction</h4>}
      >
        {title}
      </Render>
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

      <IAccordion
        items={accordionItem}
        detailClassName={"py-3! pr-5!"}
        showExpandIcon={tags.slice(tagsCount).length !== 0}
        className={"p-4 border border-gray-300"}
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
      <IButton
        variant={"contained"}
        type="submit"
        disabled={!isValid}
        title={"Submit"}
        size={"large"}
        className={"w-full"}
      />
    </form>
  );
};

export default TransactionForm;
