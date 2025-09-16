import React from "react";
import IButton from "@/components/atoms/button";
import twMerge from "@/utils/utils";

export type navItems = {
  id: number;
  title: string;
};

type FilterButtonProps = {
  navItems: navItems[];
  activeId: number;
  onChange: (id: number) => void;
};

const FilterButtons = ({ navItems, activeId, onChange }: FilterButtonProps) => {
  return (
    <nav>
      {navItems.map((item, index) => {
        const isActive = activeId === item.id;
        return (
          <IButton
            key={`nav-items-${index}-${item.id}`}
            role="tab"
            onClick={() => onChange(item.id)}
            variant={isActive ? "contained" : "outlined"}
            // className={twMerge(
            //   `px-4 py-2 rounded-xl text-sm font-medium`,
            //   isActive
            //     ? "bg-blue-500 text-white"
            //     : "bg-white border border-gray-300 text-gray-700"
            // )}
          >
            {item.title}
          </IButton>
        );
      })}
    </nav>
  );
};

export default FilterButtons;
