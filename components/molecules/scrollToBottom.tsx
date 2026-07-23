"use client";

import React, { useEffect, useState } from "react";
import KeyboardDoubleArrowDownTwoToneIcon from "@mui/icons-material/KeyboardDoubleArrowDownTwoTone";
import { twMerge } from "tailwind-merge";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      onClick={scrollToTop}
      aria-label="scroll-to-top"
      className={twMerge(
        "bg-primary_light !border-primary fixed right-4 bottom-4 w-fit rounded-full !border-6 p-3 opacity-100 drop-shadow-sm transition-opacity print:!hidden",
        !showButton && "pointer-events-none opacity-0",
      )}
    >
      <KeyboardDoubleArrowDownTwoToneIcon className="text-olive_darb rotate-180" />
    </div>
  );
};

export default ScrollToTopButton;
