import React from "react";
import { convertToCurrency } from "@/utils/utils";
import { twMerge } from "tailwind-merge";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { TagType } from "@/types/global";
import { iconList } from "@/constant/icons";
import { groupedStyles } from "@/utils/transactionGroupedStyles";
import { Render } from "@/utils/render";
import useCalendarUtils from "@/hooks/useCalendarUtils";

type Props = {
  tag: TagType;
  amount: string;
  date: string;
  amountBeforeSettled?: string;
  showTagIcon?: boolean;
  showTagIconColor?: boolean;
};

const MainTransactionTitle = ({
  tag,
  date,
  amount,
  amountBeforeSettled,
  showTagIcon = false,
  showTagIconColor = false,
}: Props) => {
  const Icon = iconList.get(tag?.icon || "0")?.icon || (() => <></>);
  const { formatDate } = useCalendarUtils();
  return (
    <>
      <div className={"w-full flex flex-row gap-3 justify-between items-start"}>
        <div className={"flex flex-col gap-1"}>
          <span className={"flex flex-row justify-start items-center gap-2"}>
            {showTagIcon && (
              <Icon
                fontSize={"large"}
                className={twMerge(
                  "opacity-90 rounded-full p-1",
                  showTagIconColor
                    ? "bg-transparent border-2 border-dotted border-placeholder"
                    : twMerge("text-dark", groupedStyles(tag?.transactionType))
                )}
              />
            )}
            <span className={"text-lg"}>{tag?.name}</span>
          </span>
          <time className={"text-xs text-placeholder"}>{formatDate(date)}</time>
        </div>
        <span className={"flex flex-row items-center"}>
          <h4>
            <AttachMoneyIcon />
          </h4>
          <Render
            when={!amountBeforeSettled}
            fallback={
              <h4 className={"text-placeholder line-through"}>
                {convertToCurrency(amountBeforeSettled || "")}
              </h4>
            }
          >
            <h4>{convertToCurrency(amount)} </h4>
          </Render>
        </span>
      </div>
    </>
  );
};

export default MainTransactionTitle;
