"use client";

import React from "react";
import { Button, MenuItem, Select } from "@mui/material";
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

const CreateTagForm = ({
  submitHandler,
  ...props
}: Partial<TagFormData> & { submitHandler: (data: TagFormData) => void }) => {
  const schema = yup.object({
    [FormTagEnum.NAME]: yup.string().required("name is required"),
    [FormTagEnum.ICON]: yup.string().required("icon is required"),
    [FormTagEnum.COLOR]: yup.mixed<ColorOption>().required("color is required"),
    [FormTagEnum.TRANSACTION_TYPE]: yup
      .mixed<TransactionEnum>()
      .oneOf(Object.values(TransactionEnum) as TransactionEnum[])
      .required("transaction type is required"),
  });

  const {
    control,
    handleSubmit,
    watch,
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

  const onSubmit = (formData: TagFormData) => {
    submitHandler(formData);
  };

  return (
    <form
      className={"flex flex-col gap-4 w-full"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name={FormTagEnum.NAME}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <ITextField
            {...field}
            label="Tag Name"
            fullWidth
            error={!!errors[FormTagEnum.NAME]}
            helperText={errors[FormTagEnum.NAME]?.message}
          />
        )}
      />
      <Controller
        control={control}
        name={FormTagEnum.ICON}
        render={({ field }) => (
          <IconPicker
            icons={Array.from(iconList.values())}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        control={control}
        name={FormTagEnum.COLOR}
        render={({ field }) => (
          <ColorPicker
            colorList={colorList}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        control={control}
        name={FormTagEnum.TRANSACTION_TYPE}
        render={({ field }) => (
          <Select label="Type" {...field} value={field.value ?? ""}>
            {Object.values(TransactionEnum).map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <TagDemo
        demoTitle={"new tag demo :"}
        name={watch(FormTagEnum.NAME)}
        transactionType={watch(FormTagEnum.TRANSACTION_TYPE)}
        icon={watch(FormTagEnum.ICON)}
        color={watch(FormTagEnum.COLOR)}
      />
      <Button variant={"contained"} type="submit" disabled={!isValid}>
        Submit
      </Button>
    </form>
  );
};

export default CreateTagForm;
