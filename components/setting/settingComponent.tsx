"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Edit2, Trash } from "iconsax-react";
import { useTransactionStore } from "@/store/transaction";
import { toast } from "sonner";
import { useTagsStore } from "@/store/tags";
import { useBudgetStore } from "@/store/budget";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import LogoutButton from "@/components/logout";
import LoginForm from "@/components/login/loginForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api, { API_URL } from "@/utils/axios";
import { settingItems } from "@/components/setting/settingItems";

const SettingComponent = () => {
  const [open, setIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { clearAllTransactions } = useTransactionStore();
  const { clear } = useTagsStore();
  const { clear: clearBudgets } = useBudgetStore();

  const { data, isLoading } = useQuery({
    queryKey: [API_URL.userInfo.queryKey],
    queryFn: async () => {
      const res = await api.get(API_URL.userInfo.api);
      return res.data;
    },
  });

  const username = data?.username;

  const updateUsernameMutation = useMutation({
    mutationFn: async (newUsername: string) => {
      const res = await api.post(API_URL.updateUsername.api, {
        username: newUsername,
      });

      return res.data;
    },

    onSuccess: (data, newUsername) => {
      if (data.ok) {
        toast.success(
          <span>
            <strong>Username</strong> updated successfully!
          </span>
        );

        queryClient.setQueryData([API_URL.userInfo.queryKey], {
          username: newUsername,
        });

        setIsOpen(false);
      } else {
        toast.error("Failed to update your name. Try again!");
      }
    },

    onError: () => {
      toast.error("Something went wrong! Try again.");
    },
  });

  const handleEditUsername = (formData: { username: string }) => {
    updateUsernameMutation.mutate(formData.username);
  };

  const items = settingItems(clearAllTransactions, clear, clearBudgets);

  return (
    <div className={"flex flex-col items-center gap-15 mt-15"}>
      <section className="flex flex-col items-center justify-center">
        <Image src="/setting.png" alt="icon" width={100} height={100} />

        <div className="flex flex-row gap-2 items-end justify-center cursor-pointer">
          <span className="text-2xl">
            {isLoading ? (
              <div className="animate-pulse bg-placeholder_light h-5 w-32 rounded-full"></div>
            ) : (
              username
            )}
          </span>

          <Edit2
            size="35"
            color={"var(--color-brown)"}
            variant="Bulk"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </section>

      <section className="flex flex-col items-center justify-center">
        <ul className="flex flex-col gap-3 items-start p-1">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-row gap-3 justify-between items-center w-full p-3 bg-neutral_dark border border-olive cursor-pointer rounded-full hover:bg-white"
              onClick={() => item.onClick()}
            >
              <span>{item.title}</span>
              <Trash size="30" color={"var(--color-olive)"} variant="Bulk" />
            </li>
          ))}
        </ul>
      </section>

      {/* Edit Username Modal */}
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
            width: "300px",
            height: "fit-content",
          }}
        >
          <LoginForm
            onSubmit={handleEditUsername}
            loading={updateUsernameMutation.isPending}
            title={"Change name"}
          />
        </Box>
      </Modal>

      {/* Logout */}
      <LogoutButton />
    </div>
  );
};

export default SettingComponent;
