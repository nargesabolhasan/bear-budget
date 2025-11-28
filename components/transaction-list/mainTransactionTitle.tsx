import React from "react";
import { convertToCurrency } from "@/utils/utils";
import { twMerge } from "tailwind-merge";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { TagInfoTransaction } from "@/types/global";
import { iconList } from "@/constant/icons";
import { groupedStyles } from "@/utils/transactionGroupedStyles";
import { Render } from "@/utils/render";

type Props = {
  tag: TagInfoTransaction;
  amount: string;
  date: string;
  amountBeforeSettled?: string;
  showTagIcon?: boolean;
};

const MainTransactionTitle = ({
  tag,
  date,
  amount,
  amountBeforeSettled,
  showTagIcon = false,
}: Props) => {
  const Icon = iconList.get(tag.icon || "0")?.icon || (() => <></>);

  return (
    <>
      <div className={"w-full flex flex-row gap-3 justify-between items-start"}>
        <div className={"flex flex-col gap-1"}>
          <span className={"flex flex-row justify-start items-center gap-1"}>
            {showTagIcon && (
              <Icon
                className={twMerge(
                  "opacity-70 rounded-full p-1",
                  groupedStyles(tag.type)
                )}
              />
            )}
            <span className={"text-lg"}>{tag.name}</span>
          </span>
          <time className={"text-sm text-placeholder"}>{date}</time>
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
