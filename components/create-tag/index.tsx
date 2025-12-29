"use client";

import React, { ReactNode } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import IconPicker from "@/components/create-tag/iconPicker";
import { iconList } from "@/constant/icons";
import { Controller, useForm } from "react-hook-form";
import { ColorOption, TransactionEnum } from "@/types/global";
import { FormTagEnum, TagFormData } from "@/components/create-tag/type";
import ColorPicker from "@/components/create-tag/colorPicker";
import { colorList } from "@/constant/colors";
import TagDemo from "@/components/create-tag/tagDemo";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ITextField from "@/components/atoms/textField";
import IAccordion from "@/components/molecules/accordion";
import useIconCount from "@/hooks/useIconCount";
import IButton from "@/components/atoms/button";
import i18next from "i18next";

const CreateTagForm = ({
  submitHandler,
  title,
  ...props
}: Partial<TagFormData> & {
  submitHandler: (data: TagFormData) => void;
  title?: string | ReactNode;
}) => {
  const schema = yup.object({
    [FormTagEnum.NAME]: yup
      .string()
      .required(
        i18next.t("global.required", { value: i18next.t("global.name") })
      )
      .max(40, i18next.t("global.charLimit", { value: 40 })),
    [FormTagEnum.ICON]: yup
      .string()
      .required(
        i18next.t("global.required", { value: i18next.t("global.icon") })
      ),
    [FormTagEnum.COLOR]: yup
      .mixed<ColorOption>()
      .required(
        i18next.t("global.required", { value: i18next.t("global.color") })
      ),
    [FormTagEnum.TRANSACTION_TYPE]: yup
      .mixed<TransactionEnum>()
      .oneOf(Object.values(TransactionEnum) as TransactionEnum[])
      .required(
        i18next.t("global.required", {
          value: i18next.t("addTransaction.transactionType"),
        })
      ),
  });

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isValid, errors },
  } = useForm<TagFormData>({
    defaultValues: {
      [FormTagEnum.ICON]: props?.icon || "",
      [FormTagEnum.COLOR]: props?.color || colorList[0],
      [FormTagEnum.TRANSACTION_TYPE]:
        props?.transactionType || TransactionEnum.INCOME,
      [FormTagEnum.NAME]: props?.name || "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const iconCount = useIconCount(57);
  const colorCount = useIconCount(57, ".color-wrapper");

  const onSubmit = (formData: TagFormData) => {
    submitHandler(formData);
    //edit page dont need reset
    if (!props.name) reset();
  };

  const items = [
    {
      id: 1,
      panel: "panel-icon",
      summary: (
        <div className={"h-full w-full flex flex-col gap-2"}>
          <h4>{i18next.t("createTag.selectIcon")}</h4>
          <Controller
            control={control}
            name={FormTagEnum.ICON}
            render={({ field }) => (
              <IconPicker
                icons={Array.from(iconList.values()).slice(0, iconCount)}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      ),
      detail: (
        <Controller
          control={control}
          name={FormTagEnum.ICON}
          render={({ field }) => (
            <IconPicker
              icons={Array.from(iconList.values()).slice(iconCount)}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      ),
      ariaControl: "panel-icon-aria",
      panelHeaderId: "panel-icon-header",
    },
    {
      id: 2,
      panel: "panel-color",
      summary: (
        <div className={"h-full w-full flex flex-col gap-2"}>
          <h4>{i18next.t("createTag.selectColor")}</h4>
          <Controller
            control={control}
            name={FormTagEnum.COLOR}
            render={({ field }) => (
              <ColorPicker
                colorList={colorList.slice(0, colorCount)}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      ),
      detail: (
        <Controller
          control={control}
          name={FormTagEnum.COLOR}
          render={({ field }) => (
            <ColorPicker
              colorList={colorList.slice(colorCount)}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      ),
      ariaControl: "panel-color-aria",
      panelHeaderId: "panel-color-header",
    },
  ];

  return (
    <form
      className={"flex flex-col gap-4 w-full"}
      onSubmit={handleSubmit(onSubmit)}
      dir={"auto"}
    >
      {title && title}
      <Controller
        name={FormTagEnum.NAME}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <ITextField
            {...field}
            label={i18next.t("createTag.tagName")}
            fullWidth
            error={!!errors[FormTagEnum.NAME]}
            helperText={errors[FormTagEnum.NAME]?.message}
            autoComplete="name"
          />
        )}
      />
      <IAccordion
        items={items}
        summeryClassName={"m-0! h-fit"}
        className={"p-4 border border-placeholder_light"}
      />
      <FormControl fullWidth variant="outlined">
        <InputLabel id="transaction-type-label">
          {i18next.t("home.type")}
        </InputLabel>
        <Controller
          control={control}
          name={FormTagEnum.TRANSACTION_TYPE}
          render={({ field }) => (
            <Select
              label="Type"
              {...field}
              value={field.value ?? ""}
              sx={{
                borderRadius: "20px",
                backgroundColor: "var(--color-surface)",
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: "20px",
                  },
                },
              }}
            >
              {Object.values(TransactionEnum).map((value) => (
                <MenuItem key={value} value={value}>
                  {i18next.t(`transactions.${value}`)}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      <TagDemo
        demoTitle={i18next.t("createTag.tagDemo")}
        name={watch(FormTagEnum.NAME)}
        transactionType={watch(FormTagEnum.TRANSACTION_TYPE)}
        icon={watch(FormTagEnum.ICON)}
        color={watch(FormTagEnum.COLOR)}
        className={"w-full md:w-1/2 rounded-4xl"}
      />
      <IButton
        className={"w-full !rounded-full"}
        variant={"contained"}
        type="submit"
        size={"large"}
        disabled={!isValid}
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

export default CreateTagForm;
