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
        "w-fit bg-primary_light rounded-full p-3 !border-6 !border-primary print:!hidden drop-shadow-sm fixed bottom-4 right-4 transition-opacity opacity-100",
        !showButton && "opacity-0 pointer-events-none"
      )}
    >
      <KeyboardDoubleArrowDownTwoToneIcon className="text-olive_darb rotate-180" />
    </div>
  );
};

export default ScrollToTopButton;
