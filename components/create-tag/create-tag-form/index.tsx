import React from "react";
import { MenuItem, Select, TextField } from "@mui/material";
import IconPicker from "@/components/create-tag/create-tag-form/iconPicker";
import { iconList } from "@/constant/icons";
import { Controller, useForm } from "react-hook-form";
import { TagType, TransactionEnum } from "@/types/global";
import { FormTagEnum } from "@/components/create-tag/create-tag-form/type";

const CreateTagForm = () => {
  const { control, handleSubmit } = useForm<TagType>({
    defaultValues: {
      [FormTagEnum.ICON]: null,
      [FormTagEnum.TRANSACTION_TYPE]: TransactionEnum.INCOME,
    },
  });

  const onSubmit = (formData: Omit<TagType, "id">) => {
    console.log(formData);
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
          <TextField {...field} label="Tag Name" fullWidth />
        )}
      />

      <Controller
        control={control}
        name={FormTagEnum.ICON}
        render={({ field }) => (
          <IconPicker
            icons={Object.values(iconList)}
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateTagForm;
