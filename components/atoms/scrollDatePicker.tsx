"use client";

import { useEffect, useRef, useState } from "react";
import {
  FieldValues,
  Path,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";
import i18next from "i18next";

type Props<T extends FieldValues> = {
  dateList: Array<string | number>;
  defaultValue?: string | number;
  title: Path<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  showTitle?: boolean;
};

export default function ScrollDatePicker<T extends FieldValues>({
  dateList,
  defaultValue,
  title,
  setValue,
  watch,
  showTitle = true,
}: Props<T>) {
  const itemHeight = 48;
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [selected, setSelected] = useState<string | number>(
    defaultValue ?? dateList[0],
  );

  const extendedDates = [...dateList, ...dateList, ...dateList];
  const middleOffset = dateList.length * itemHeight;

  useEffect(() => {
    const newValue = defaultValue ?? dateList[0];

    if (watch(title) !== newValue) {
      setValue(title, newValue as T[Path<T>]);
    }

    setSelected(newValue);
  }, [defaultValue, dateList, setValue, title, watch]);

  const handleScroll = () => {
    if (!containerRef.current) return;

    const scrollTop = containerRef.current.scrollTop;
    const rawIndex = Math.round(scrollTop / itemHeight) % dateList.length;
    const index = (rawIndex + dateList.length) % dateList.length;
    const selectedDate = dateList[index];

    if (selected !== selectedDate) {
      setSelected(selectedDate);
      setValue(title, selectedDate as T[Path<T>]);
    }

    if (scrollTop < dateList.length * itemHeight) {
      containerRef.current.scrollTop = scrollTop + middleOffset;
    } else if (scrollTop > dateList.length * itemHeight * 2) {
      containerRef.current.scrollTop = scrollTop - middleOffset;
    }
  };

  useEffect(() => {
    const ref = containerRef.current;
    if (!ref) return;

    ref.addEventListener("scroll", handleScroll);

    return () => ref.removeEventListener("scroll", handleScroll);
  }, [selected]);

  useEffect(() => {
    const ref = containerRef.current;
    if (!ref) return;

    const initialValue = defaultValue ?? dateList[0];

    const index = dateList.findIndex((item) => item === initialValue);

    ref.scrollTop =
      index >= 0 ? middleOffset + index * itemHeight : middleOffset;
  }, [defaultValue, dateList]);

  const handleClick = (date: string | number) => {
    if (!containerRef.current) return;

    const index = dateList.findIndex((item) => item === date);

    containerRef.current.scrollTo({
      top: middleOffset + index * itemHeight,
      behavior: "smooth",
    });

    setSelected(date);
    setValue(title, date as T[Path<T>]);
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
        <b className="text-xs md:text-sm">{String(watch(title) ?? "")}</b>
      </p>
    </div>
  );
}
