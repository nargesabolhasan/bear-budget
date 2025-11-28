"use client";

import { useEffect, useRef, useState } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type Props = {
  dateList: string[] | number[];
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
    defaultValue ?? dateList[0]
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
    //@ts-ignore
    const index = dateList.indexOf(initialValue);

    const initialScrollTop =
      index >= 0 ? middleOffset + index * itemHeight : middleOffset;

    ref.scrollTop = initialScrollTop;
  }, []);

  // Click item → scroll to it
  const handleClick = (date: string | number) => {
    if (!containerRef.current) return;
    //@ts-ignore
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
    <div className="flex flex-col items-center my-2 transition-all duration-500">
      {showTitle && (
        <h2 className="text-md md:text-xl mb-4 text-placeholder">
          Select {title}
        </h2>
      )}

      <div
        ref={containerRef}
        className="relative h-48 w-30 md:w-40 overflow-y-scroll no-scrollbar border-2 border-dashed border-placeholder rounded-2xl"
      >
        {extendedDates.map((date, index) => (
          <div
            key={index}
            onClick={() => handleClick(date)}
            className={twMerge(
              "w-full h-12 flex items-center justify-center transition-colors cursor-pointer text-xs md:text-sm",
              selected === date &&
                "bg-primary_light text-sm md:text-lg shadow-lg shadow-primary_light"
            )}
          >
            {date}
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs md:text-base text-placeholder">
        Selected: <b className="text-xs md:text-sm">{watch(title)}</b>
      </p>
    </div>
  );
}
