"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Edit2, Trash } from "iconsax-react";
import { useTransactionStore } from "@/store/transaction";
import { toast } from "sonner";
import { useTagsStore } from "@/store/tags";
import { useBudgetStore } from "@/store/budget";
import LogoutButton from "@/components/inner-components/logout";
import LoginForm from "@/components/inner-components/login/loginForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api, { API_URL } from "@/utils/axios";
import { settingItems } from "@/components/inner-components/setting/settingItems";
import ThemeToggle from "@/components/inner-components/setting/toggleTheme";
import ToggleLanguage from "@/components/inner-components/setting/toggleLanguage";
import { useTranslation } from "react-i18next";
import ToggleCalendarMode from "@/components/inner-components/setting/toggleCalendarMode";
import IModal from "@/components/molecules/modal";
import DateModal from "@/components/inner-components/print-summery/dateModal";

const SettingComponent = () => {
  const [open, setIsOpen] = useState<boolean>(false);
  const [openPrinter, setOpenPrinter] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { clearAllTransactions } = useTransactionStore();
  const { clear } = useTagsStore();
  const { clear: clearBudgets } = useBudgetStore();
  const { t } = useTranslation();

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
            {t("global.updateValue", {
              value: username,
            })}
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

  const handlePrint = () => {
    setOpenPrinter(true);
  };

  const items = settingItems(
    clearAllTransactions,
    clear,
    clearBudgets,
    handlePrint
  );

  return (
    <div
      className={
        "mb-8 flex flex-col items-center gap-8 mt-5 md:mt-10 w-[260px] mx-auto"
      }
    >
      <section
        className="flex flex-col items-center justify-center"
        dir={"ltr"}
      >
        <Image
          src="/fix.png"
          alt="icon"
          width={150}
          height={150}
          priority
          unoptimized
        />

        <div className="flex flex-row gap-2 items-end justify-center">
          <span className="text-2xl">
            {isLoading ? (
              <div className="animate-pulse bg-placeholder_light h-5 w-32 rounded-full"></div>
            ) : (
              username
            )}
          </span>

          <Edit2
            className={"cursor-pointer"}
            size="33"
            color={"var(--color-brown_secondary)"}
            variant="Bulk"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </section>
      <ThemeToggle />
      <ToggleLanguage />
      <ToggleCalendarMode />
      <section className="flex flex-col items-center justify-center w-full">
        <ul className="flex flex-col gap-3 items-start w-full">
          {items.map((item) => {
            const Icon = item?.icon;
            return (
              <li
                key={item.id}
                className="flex flex-row gap-3 justify-between items-center w-full p-3 bg-neutral_dark border border-olive cursor-pointer rounded-full hover:bg-surface"
                onClick={() => item.onClick()}
              >
                <span>{item.title}</span>
                {!!Icon ? (
                  <Icon
                    size="30"
                    color={"var(--color-hover_primary)"}
                    variant="Bulk"
                  />
                ) : (
                  <Trash
                    size="30"
                    color={"var(--color-olive)"}
                    variant="Bulk"
                  />
                )}
              </li>
            );
          })}
        </ul>
      </section>
      <DateModal open={openPrinter} handleClose={() => setOpenPrinter(false)} />
      {/* Edit Username Modal */}
      <IModal open={open} onClose={() => setIsOpen(false)}>
        <LoginForm
          onSubmit={handleEditUsername}
          loading={updateUsernameMutation.isPending}
          title={t("setting.changeName")}
        />
      </IModal>
      {/* Logout */}
      <LogoutButton />
    </div>
  );
};

export default SettingComponent;
