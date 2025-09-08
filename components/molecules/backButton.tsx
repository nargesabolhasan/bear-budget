"use client";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { IconButton } from "@mui/material";

const BackButton = () => {
  const router = useRouter();
  return (
    <IconButton onClick={router.back}>
      <ArrowBackIcon />
    </IconButton>
  );
};

export default BackButton;
