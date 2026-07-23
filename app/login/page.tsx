"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import LoginForm from "@/components/core-components/login/loginForm";
import api, { API_URL } from "@/utils/axios";
import Image from "next/image";
import { toast } from "sonner";
import i18next from "i18next";

export default function LoginPage() {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async (username: string) => {
      const res = await api.post(API_URL.login.api, { username });

      if (!res.data.ok) {
        throw new Error(res.data.error || i18next.t("login.loginFailed"));
      }

      return res.data;
    },

    onSuccess: () => {
      router.refresh();
      router.push("/");
      toast.success(i18next.t("login.welcome"));
    },

    onError: (err: any) => {
      toast.error(err.message || i18next.t("login.somethingWentWrong"));
    },
  });
  const handleSubmit = (formData: { username: string }) => {
    loginMutation.mutate(formData.username);
  };

  return (
    <div
      className={
        "mx-auto mt-20 flex flex-col items-start justify-center gap-20 md:mt-45 md:w-2/5"
      }
    >
      <div className={"flex w-full flex-col items-center justify-center gap-2"}>
        <Image
          unoptimized
          priority
          src="/favicon.svg"
          alt="icon"
          width={120}
          height={120}
        />
        <b
          className={"text-center text-2xl"}
          style={{
            fontFamily:
              i18next.language === "en-US"
                ? "PlaywriteNZGuides"
                : "playpenSansArabic",
          }}
        >
          {i18next.t("login.welcome")}
        </b>
      </div>
      <LoginForm
        onSubmit={handleSubmit}
        loading={loginMutation.isPending}
        title={i18next.t("login.enterName")}
      />
    </div>
  );
}
