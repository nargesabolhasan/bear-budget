import React from "react";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ITextField from "@/components/atoms/textField";
import IButton from "@/components/atoms/button";
import { CircularProgress } from "@mui/material";

const schema = yup.object({
  username: yup
    .string()
    .required("Amount is required")
    .max(50, "username must be less than 50 characters"),
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
            label="Username"
            fullWidth
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        )}
      />
      <IButton type={"submit"}>
        {loading ? <CircularProgress color={"info"} size={30} /> : "Submit"}
      </IButton>
    </form>
  );
};

export default LoginForm;
