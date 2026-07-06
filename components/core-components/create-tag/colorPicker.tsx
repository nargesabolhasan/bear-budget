import React from "react";
import { twMerge } from "tailwind-merge";
import { ColorOption } from "@/types/global";
import { PICKER_WRAPPER_CLASS } from "@/constant/className";

export type ColorPickerType = {
  colorList: ColorOption[];
  onChange: (color: ColorOption) => void;
  value: ColorOption;
};

const ColorPicker = ({
  colorList,
  value = { id: 0, color: "" },
  onChange,
}: ColorPickerType) => {
  const handleSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const button = (e.target as HTMLButtonElement).closest(
      ".color-picker-item"
    );
    if (button) {
      const color = button.getAttribute("data-color") || "";
      const id = Number(button.getAttribute("data-color-id")) || 0;
      onChange({
        color,
        id,
      });
    }
  };

  return (
    <div
      onClick={handleSelect}
      className={twMerge("color-wrapper", PICKER_WRAPPER_CLASS)}
    >
      {colorList.map((color) => (
        <div
          key={color.id}
          data-color={color.color}
          data-color-id={color.id}
          className={twMerge(
            `color-picker-item w-[40px] h-[40px] rounded-full border border-placeholder hover:scale-130`,
            value?.id === color.id &&
              "border-3 border-dashed !border-dark scale-130 !shadow-md shadow-placeholder dark:!shadow-[0_0_10px_rgba(0,0,0,0.15)]",
            color.color
          )}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
