import React from "react";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import IconPicker from "@/components/create-tag/create-tag-form/iconPicker";
import { iconList } from "@/constant/icons";
import { Controller, useForm } from "react-hook-form";
import { ColorOption, TransactionEnum } from "@/types/global";
import {
  FormTagEnum,
  TagFormData,
} from "@/components/create-tag/create-tag-form/type";
import ColorPicker from "@/components/create-tag/create-tag-form/colorPicker";
import { colorList } from "@/constant/colors";
import TagDemo from "@/components/create-tag/create-tag-form/tagDemo";
import { useTagsStore } from "@/store/tags";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const CreateTagForm = () => {
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
      [FormTagEnum.ICON]: "",
      [FormTagEnum.COLOR]: colorList[0],
      [FormTagEnum.TRANSACTION_TYPE]: TransactionEnum.INCOME,
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { createTag } = useTagsStore();
  const onSubmit = (formData: TagFormData) => {
    createTag({ id: uuidv4(), ...formData });
  };

  return (
    <form
      className={"p-3 mx-auto flex flex-col gap-4 w-full md:w-1/2"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name={FormTagEnum.NAME}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
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
