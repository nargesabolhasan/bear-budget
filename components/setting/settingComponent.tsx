"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Edit2, Trash } from "iconsax-react";
import { useTransactionStore } from "@/store/transaction";
import { openDialog } from "@/components/molecules/dialogContainer";
import { toast } from "sonner";
import { useTagsStore } from "@/store/tags";
import { useBudgetStore } from "@/store/budget";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import IButton from "@/components/atoms/button";
import ITextField from "@/components/atoms/textField";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  username: yup
    .string()
    .required("Amount is required")
    .max(50, "username must be less than 50 characters"),
});

const SettingComponent = () => {
  const [username, setUsername] = useState("");
  const [open, setIsOpen] = useState<boolean>(false);

  const { clearAllTransactions } = useTransactionStore();
  const { clear } = useTagsStore();
  const { clear: clearBudgets } = useBudgetStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const savedUsername = localStorage.getItem("username") || "";
    setUsername(savedUsername);
  }, []);

  const handleEditUsername = (formData: { username: string }) => {
    localStorage.setItem("username", formData.username);
  };

  const items = [
    {
      id: 1,
      title: "Delete All Transactions",
      onClick: () => {
        openDialog({
          title: "Clear All",
          hint: "Clear All of transaction!",
          confirmHandler: () => {
            clearAllTransactions();
            toast.success(<span>Deleted successfully.</span>);
          },
        });
      },
    },
    {
      id: 2,
      title: "Delete All Tags",
      onClick: () => {
        openDialog({
          title: "Clear All",
          hint: "Clear All of Tags!",
          confirmHandler: () => {
            clearAllTransactions();
            toast.success(<span>Deleted successfully.</span>);
          },
        });
        clear();
      },
    },
    {
      id: 3,
      title: "Delete All Budgets",
      onClick: () => {
        openDialog({
          title: "Clear All",
          hint: "Clear All of budgets !",
          confirmHandler: () => {
            clearAllTransactions();
            toast.success(<span>Deleted successfully.</span>);
          },
        });

        clearBudgets();
      },
    },
  ];

  return (
    <div className={"flex flex-col items-center gap-15 mt-15"}>
      <section className={"flex flex-col items-center justify-center"}>
        <Image src="/setting.png" alt="icon" width={100} height={100} />
        <div
          className={
            "flex flex-row gap-2 items-end justify-center cursor-pointer"
          }
        >
          <span className={"text-2xl"}>{username}</span>
          <Edit2
            size="35"
            color={"var(--color-brown)"}
            variant="Bulk"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </section>
      <section className={"flex flex-col items-center justify-center"}>
        <ul className={"flex flex-col gap-3 items-start p-1"}>
          {items.map((item) => (
            <li
              className={
                "flex flex-row gap-3 justify-between items-center w-full p-3 bg-neutral_dark border border-olive cursor-pointer rounded-full hover:bg-neutral_light"
              }
              onClick={() => item.onClick()}
            >
              <span>{item.title}</span>
              <Trash size="30" color={"var(--color-olive)"} variant="Bulk" />
            </li>
          ))}
        </ul>
      </section>
      <Modal open={open} onClose={() => setIsOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "var(--color-neutral_light)",
            borderRadius: 15,
            boxShadow: 15,
            p: 4,
            width: "fit-content",
            height: "fit-content",
          }}
        >
          <form
            className={"flex flex-col gap-2 items-center"}
            onSubmit={handleSubmit(handleEditUsername)}
          >
            <span>Change Username</span>
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
            <IButton type={"submit"}>Submit</IButton>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default SettingComponent;
