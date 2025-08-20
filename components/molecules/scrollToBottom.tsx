"use client";

import React, { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const ScrollToBottomButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;
      setIsVisible(!isAtBottom);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <Fab
      color="primary"
      onClick={scrollToBottom}
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
      }}
      aria-label="scroll-to-bottom"
    >
      <ArrowDownwardIcon />
    </Fab>
  );
};

export default ScrollToBottomButton;
