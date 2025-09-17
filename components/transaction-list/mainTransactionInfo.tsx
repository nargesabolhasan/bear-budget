import React from "react";
import twMerge, { convertToCurrency } from "@/utils/utils";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { TagInfoTransaction } from "@/types/global";
import { iconList } from "@/constant/icons";
import { groupedStyles } from "@/utils/transactionGroupedStyles";

type Props = {
  tag: TagInfoTransaction;
  amount: string;
  date: string;
  showTagIcon?: boolean;
};

const MainTransactionInfo = ({
  tag,
  date,
  amount,
  showTagIcon = false,
}: Props) => {
  const Icon = iconList.get(tag.icon || "0")?.icon || (() => <></>);

  return (
    <>
      <div className={"flex flex-row gap-3 justify-between items-start"}>
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
            <span className={"text-xl font-bold"}>{tag.name}</span>
          </span>
          <time className={"text-sm text-placeholder"}>{date}</time>
        </div>
        <span className={"flex flex-row items-center"}>
          <h4>
            <AttachMoneyIcon />
          </h4>
          <h4>{convertToCurrency(amount)} </h4>
        </span>
      </div>
    </>
  );
};

export default MainTransactionInfo;
