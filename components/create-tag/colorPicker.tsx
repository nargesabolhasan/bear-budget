import React from "react";
import twMerge from "@/utils/utils";
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
      id={"color-wrapper"}
      onClick={handleSelect}
      className={PICKER_WRAPPER_CLASS}
    >
      {colorList.map((color) => (
        <div
          key={color.id}
          data-color={color.color}
          data-color-id={color.id}
          className={twMerge(
            `color-picker-item w-[40px] h-[40px] rounded-full`,
            value?.id === color.id && "border border-gray-900",
            color.color
          )}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
