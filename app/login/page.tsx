"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import LoginForm from "@/components/login/loginForm";
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
      toast.success(i18next.t("login.welcome"));
      router.push("/");
    },

    onError: (err: any) => {
      toast.error(err || i18next.t("login.somethingWentWrong"));
    },
  });

  const handleSubmit = (formData: { username: string }) => {
    loginMutation.mutate(formData.username);
  };

  return (
    <div
      className={
        "md:w-2/5 flex flex-col gap-20 items-start justify-center mx-auto mt-20 md:mt-45"
      }
    >
      <div className={"flex flex-col gap-2 items-center justify-center w-full"}>
        <Image src="/favicon.svg" alt="icon" width={120} height={120} />
        <b
          className={"text-2xl text-center"}
          style={{ fontFamily: "PlaywriteNZGuides" }}
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
