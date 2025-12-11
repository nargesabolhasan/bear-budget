"use client";
import React, { useRef } from "react";
import { twMerge } from "tailwind-merge";

interface CircleCheckboxProps {
  id?: string;
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export default function ICheckbox({
  id,
  name,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  label,
  size = "md",
  className,
}: CircleCheckboxProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isControlled = typeof checked === "boolean";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <label
      htmlFor={id}
      className={twMerge(
        "inline-flex items-center gap-2 cursor-pointer select-none",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {/* Circle */}
      <span
        className={twMerge(
          "relative flex items-center justify-center rounded-full border transition-all",
          sizeMap[size],
          "border-gray-400",
          disabled ? "bg-gray-100" : "bg-surface hover:border-gray-500"
        )}
      >
        {/* Hidden native checkbox */}
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="checkbox"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          checked={isControlled ? checked : undefined}
          defaultChecked={!isControlled ? defaultChecked : undefined}
          onChange={handleChange}
          disabled={disabled}
        />

        {/* Dot (checked state) */}
        <span
          className={twMerge(
            "rounded-full transition-all",
            isControlled
              ? checked
                ? "bg-primary opacity-100"
                : "opacity-0"
              : "opacity-0",
            size === "sm"
              ? "w-2 h-2"
              : size === "md"
              ? "w-3 h-3"
              : "w-3.5 h-3.5"
          )}
        />
      </span>

      {label && <span>{label}</span>}
    </label>
  );
}
