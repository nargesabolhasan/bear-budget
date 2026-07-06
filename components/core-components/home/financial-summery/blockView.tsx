import React from "react";
import i18next from "i18next";
import { twMerge } from "tailwind-merge";
import { Icon } from "iconsax-react";

export type SummeryViewProps = {
  list: {
    id: number;
    title: string;
    amount: string;
    icon: Icon;
    color: string;
    border: string;
  }[];
};

const BlockView = ({ list }: SummeryViewProps) => {
  return (
    <div
      className={
        "border border-placeholder_light2 border-dashed border-r-0 w-fit p-4 rounded-2xl mt-3 mx-auto"
      }
    >
      <h2 className={"italic font-semibold mb-4"}>
        {i18next.t("home.financialSummary")} :
      </h2>
      <ul className="space-y-3">
        {list.map((item) => {
          const Icon = item.icon;
          return (
            <li
              key={item.id}
              className={twMerge(
                "flex flex-row items-center gap-2 border-b-2 w-fit pb-1",
                item.border
              )}
            >
              <Icon size="32" color={item.color} /> <h3>{item.title}</h3>
              <span dir={"ltr"}>{item.amount}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BlockView;
