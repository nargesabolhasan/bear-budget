import React from "react";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ITextField from "@/components/atoms/textField";
import IButton from "@/components/atoms/button";
import { CircularProgress } from "@mui/material";
import i18next from "i18next";

const schema = yup.object({
  username: yup
    .string()
    .required(i18next.t("global.required", { value: i18next.t("home.amount") }))
    .max(50, i18next.t("global.charLimit", { value: 50 })),
});

type LoginFormProps = {
  onSubmit: (data: { username: string }) => void | Promise<void>;
  loading: boolean;
  title?: string;
};

const LoginForm = ({ onSubmit, loading, title }: LoginFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleEditUsername = (formData: { username: string }) => {
    onSubmit(formData);
  };

  return (
    <form
      className={"w-full flex flex-col gap-2 items-center"}
      onSubmit={handleSubmit(handleEditUsername)}
    >
      {!!title && <span>{title}</span>}
      <Controller
        name={"username"}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <ITextField
            {...field}
            label="Name"
            fullWidth
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        )}
      />
      <IButton type={"submit"} className={"!text-dark"}>
        {loading ? <CircularProgress color={"info"} size={30} /> : "Submit"}
      </IButton>
    </form>
  );
};

export default LoginForm;
