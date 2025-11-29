"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import LoginForm from "@/components/login/loginForm";
import api, { API_URL } from "@/utils/axios";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const loginMutation = useMutation({
    mutationFn: async (username: string) => {
      const res = await api.post(API_URL.login.api, { username });

      if (!res.data.ok) {
        throw new Error(res.data.error || "Login failed");
      }

      return res.data;
    },

    onSuccess: () => {
      router.push("/");
    },

    onError: (err: any) => {
      setError(err.message || "Something went wrong");
    },
  });

  const handleSubmit = (formData: { username: string }) => {
    setError("");
    loginMutation.mutate(formData.username);
  };

  return (
    <div
      className={
        "md:w-2/5 flex flex-col gap-25 items-start justify-center mx-auto mt-10"
      }
    >
      <div className={"flex flex-col gap-2 items-center justify-center w-full"}>
        <Image src="/favicon.svg" alt="icon" width={50} height={50} />
        <b className={"text-2xl"} style={{ fontFamily: "PlaywriteNZGuides" }}>
          Welcome to Bear Budget!
        </b>
      </div>
      <LoginForm
        onSubmit={handleSubmit}
        loading={loginMutation.isPending}
        title={"Enter your username"}
      />
      {error && <p className={"text-danger"}>{error}</p>}
    </div>
  );
}
