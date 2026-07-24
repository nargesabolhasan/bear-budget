"use client";

import { useEffect, useRef, useState } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import i18next from "i18next";

type Props = {
  dateList: (string | number)[];
  defaultValue?: string | number;
  title?: string;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  showTitle?: boolean;
};

export default function ScrollDatePicker({
  dateList,
  defaultValue,
  title = "Date",
  setValue,
  watch,
  showTitle = true,
}: Props) {
  const itemHeight = 48;
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Selected state
  const [selected, setSelected] = useState<string | number>(
    defaultValue ?? dateList[0],
  );

  // Set form initial value safely
  useEffect(() => {
    const newValue = defaultValue ?? dateList[0];
    if (watch(title) !== newValue) {
      setValue(title, newValue);
    }
    setSelected(newValue);
  }, [defaultValue]);

  // Infinite list
  const extendedDates = [...dateList, ...dateList, ...dateList];
  const middleOffset = dateList.length * itemHeight;

  // Scroll handler
  const handleScroll = () => {
    if (!containerRef.current) return;

    const scrollTop = containerRef.current.scrollTop;
    const rawIndex = Math.round(scrollTop / itemHeight) % dateList.length;
    const index = (rawIndex + dateList.length) % dateList.length;
    const selectedDate = dateList[index];

    // Update selection
    if (selected !== selectedDate) {
      setSelected(selectedDate);
      setValue(title, selectedDate);
    }

    // Infinite scroll loop logic
    if (scrollTop < dateList.length * itemHeight) {
      containerRef.current.scrollTop = scrollTop + middleOffset;
    } else if (scrollTop > dateList.length * itemHeight * 2) {
      containerRef.current.scrollTop = scrollTop - middleOffset;
    }
  };

  // Register scroll only once
  useEffect(() => {
    const ref = containerRef.current;
    if (!ref) return;

    ref.addEventListener("scroll", handleScroll);
    return () => ref.removeEventListener("scroll", handleScroll);
  }, []);

  // Set initial scroll position
  useEffect(() => {
    const ref = containerRef.current;
    if (!ref) return;

    const initialValue = defaultValue ?? dateList[0];

    const index = dateList.indexOf(initialValue);

    const initialScrollTop =
      index >= 0 ? middleOffset + index * itemHeight : middleOffset;

    ref.scrollTop = initialScrollTop;
  }, []);

  // Click item → scroll to it
  const handleClick = (date: string | number) => {
    if (!containerRef.current) return;

    const index = dateList.indexOf(date);

    const newScrollTop = middleOffset + index * itemHeight;

    containerRef.current.scrollTo({
      top: newScrollTop,
      behavior: "smooth",
    });

    setSelected(date);
    setValue(title, date);
  };

  return (
    <div className="my-2 flex flex-col items-center transition-all duration-500">
      {showTitle && (
        <h2 className="text-md text-placeholder mb-4 md:text-xl">
          {i18next.t("modal.select", {
            value: i18next.t(`modal.${title}`),
          })}
        </h2>
      )}

      <div
        ref={containerRef}
        className="no-scrollbar border-placeholder relative h-48 w-30 overflow-y-scroll rounded-2xl border-2 border-dashed md:w-40"
      >
        {extendedDates.map((date, index) => (
          <div
            key={index}
            onClick={() => handleClick(date)}
            className={twMerge(
              "flex h-12 w-full cursor-pointer items-center justify-center text-xs transition-colors md:text-sm",
              selected === date &&
                "bg-primary_light shadow-primary_light text-dark text-sm shadow-lg md:text-lg",
            )}
          >
            {date}
          </div>
        ))}
      </div>

      <p className="text-placeholder mt-4 text-xs md:text-base">
        {i18next.t("modal.selected")}:{" "}
        <b className="text-xs md:text-sm">{watch(title)}</b>
      </p>
    </div>
  );
}
