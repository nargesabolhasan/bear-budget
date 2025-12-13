"use client";

import React, { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import KeyboardDoubleArrowDownTwoToneIcon from "@mui/icons-material/KeyboardDoubleArrowDownTwoTone";
import { twMerge } from "tailwind-merge";

const ScrollToBottomButton = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;

      setIsAtBottom(!isAtBottom);
      setShowButton(document.documentElement.scrollHeight > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  if (!showButton) return null;

  return (
    <Fab
      onClick={!isAtBottom ? scrollToTop : scrollToBottom}
      sx={{
        position: "fixed",
        bottom: "calc(16px + env(safe-area-inset-bottom))",
        left: {
          xs: 16,
          lg: "30%",
        },
        boxShadow: "0px 0px 2px 8px rgba(255, 255, 255, 0.8)",
        zIndex: (theme) => theme.zIndex.fab,
      }}
      aria-label={isAtBottom ? "scroll-to-top" : "scroll-to-bottom"}
      className={"!border-3 !border-olive_darb print:!hidden"}
    >
      <KeyboardDoubleArrowDownTwoToneIcon
        className={twMerge("text-olive_darb", !isAtBottom && "rotate-180")}
      />
    </Fab>
  );
};

export default ScrollToBottomButton;
