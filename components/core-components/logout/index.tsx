"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import IButton from "@/components/atoms/button";
import api, { API_URL } from "@/utils/axios";
import { loginRoute } from "@/routes/routes";
import { toast } from "sonner";
import React from "react";
import { CircularProgress } from "@mui/material";
import { useTagsStore } from "@/store/tags";
import { useTransactionStore } from "@/store/transaction";
import { useBudgetStore } from "@/store/budget";
import { openDialog } from "@/components/molecules/dialogContainer";
import i18next from "i18next";

export default function LogoutButton() {
  const router = useRouter();
  const { clear: clearTags } = useTagsStore();
  const { clearAllTransactions } = useTransactionStore();
  const { clear: clearBudgets } = useBudgetStore();

  const { mutate: logoutMutation, isPending } = useMutation({
    mutationFn: async () => {
      const res = await api.post(API_URL.logout.api);
      return res.data;
    },
    onSuccess: () => {
      toast.success(<span>{i18next.t("logout.success")}</span>);
      clearBudgets();
      clearTags();
      clearAllTransactions();
      router.push(loginRoute.href);
    },
    onError: () => {
      toast.error(
        <span>
          <strong>Failed to logout.</strong> Try again.
        </span>
      );
    },
  });

  const handleLogout = () => {
    openDialog({
      title: i18next.t("logout.title"),
      hint: <span>{i18next.t("logout.hint")}</span>,
      confirmHandler: () => {
        logoutMutation();
      },
    });
  };

  return (
    <IButton
      onClick={handleLogout}
      disabled={isPending}
      className={"w-full !text-dark"}
    >
      {isPending ? (
        <CircularProgress color={"info"} size={30} />
      ) : (
        i18next.t("logout.title")
      )}
    </IButton>
  );
}
