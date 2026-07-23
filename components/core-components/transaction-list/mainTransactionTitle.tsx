import React from "react";
import { convertToCurrency } from "@/utils/utils";
import { twMerge } from "tailwind-merge";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { TagType } from "@/types/global";
import { iconList } from "@/constant/icons";
import { groupedStyles } from "@/utils/transactionGroupedStyles";
import { Render } from "@/utils/render";
import useCalendarUtils from "@/hooks/useCalendarUtils";
import i18n from "@/i18n/config";

type Props = {
  tag: TagType;
  amount: string;
  date: string;
  amountBeforeSettled?: string;
  showTagIcon?: boolean;
  showTagIconColor?: boolean;
  isSystemtransaction?: boolean;
};

const MainTransactionTitle = ({
  tag,
  date,
  amount,
  amountBeforeSettled,
  showTagIcon = false,
  showTagIconColor = false,
  isSystemtransaction = false,
}: Props) => {
  const Icon = iconList.get(tag?.icon || "0")?.icon || (() => <></>);
  const { formatDate } = useCalendarUtils();
  return (
    <>
      <div className={"flex w-full flex-row items-start justify-between gap-3"}>
        <div className={"flex flex-col gap-1"}>
          <span className={"flex flex-row items-center justify-start gap-2"}>
            {showTagIcon && (
              <Icon
                fontSize={"large"}
                className={twMerge(
                  "rounded-full p-1 opacity-90",
                  showTagIconColor
                    ? "border-placeholder border-2 border-dotted bg-transparent"
                    : twMerge("text-dark", groupedStyles(tag?.transactionType)),
                )}
              />
            )}
            <span className={"text-lg"}>
              {isSystemtransaction
                ? i18n.t(`transactions.system.previousMonth`)
                : tag.name}
            </span>
          </span>
          <time className={"text-placeholder text-xs"}>{formatDate(date)}</time>
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
            <h4>{convertToCurrency(amount)}</h4>
          </Render>
        </span>
      </div>
    </>
  );
};

export default MainTransactionTitle;
