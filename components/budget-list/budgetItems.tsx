import React from "react";
import { iconList } from "@/constant/icons";
import { twMerge } from "tailwind-merge";
import ILinearProgress from "@/components/atoms/linearProgress";
import { convertToCurrency } from "@/utils/utils";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import ContextMenu from "@/components/molecules/contextMenu";
import { Edit2, Trash } from "iconsax-react";
import { TagType } from "@/types/global";

type Props = {
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
  tag: TagType;
  tagId: string;
  budgetAmount: number;
  spent: number;
};

const BudgetItems = ({
  handleDelete,
  handleEdit,
  tag,
  tagId,
  budgetAmount,
  spent,
}: Props) => {
  const Icon = iconList.get(tag?.icon || "0")?.icon || (() => <></>);
  const usagePercent = Math.min((spent / budgetAmount) * 100, 100) || 0;
  const remining = budgetAmount - spent;

  const menuItems = [
    {
      id: 1,
      onClick: () => handleEdit(tagId),
      title: (
        <span
          className={"w-full flex flex-row gap-2 items-center justify-start"}
        >
          <Edit2
            size="30"
            color={"var(--color-hover_primary)"}
            variant="Bulk"
          />
          Edit
        </span>
      ),
    },
    {
      id: 2,
      onClick: () => handleDelete(tagId),
      title: (
        <span
          className={"!text-sm flex flex-row gap-2 items-center justify-start"}
        >
          <Trash size="30" color={"var(--color-primary)"} variant="Bulk" />
          Delete
        </span>
      ),
    },
  ];

  return (
    <li
      key={tagId}
      className={
        "flex flex-col border-b border-dashed border-placeholder py-4 px-3"
      }
    >
      <div className={"w-full flex justify-end print:hidden"}>
        <ContextMenu menuItems={menuItems} resetAfterSelect>
          <MoreHorizTwoToneIcon />
        </ContextMenu>
      </div>
      <section className={"grid grid-cols-3 items-center gap-2 md:gap-4 mb-8"}>
        <span>
          <i
            className={twMerge(
              "flex justify-center items-center p-2 rounded-full size-[40]",
              tag?.color.color
            )}
          >
            <Icon />
          </i>
          {tag?.name}
        </span>
        <div className={"col-span-2 w-full grow"}>
          <ILinearProgress
            value={usagePercent}
            height={25}
            overFlow={remining < 0}
          />
        </div>
      </section>
      <section
        className={
          "grid grid-cols-3 items-start gap-2 md:gap-4 text-sm md:text-md"
        }
      >
        <span className={"flex flex-col lg:flex-row gap-2"}>
          <span
            className={"text-placeholder"}
            style={{ fontFamily: "PlaywriteNZGuides" }}
          >
            Budget
          </span>
          {convertToCurrency(budgetAmount)}
        </span>
        <span className={"flex flex-col lg:flex-row gap-2"}>
          <span
            className={"text-placeholder"}
            style={{ fontFamily: "PlaywriteNZGuides" }}
          >
            Spent
          </span>
          {convertToCurrency(spent)}
        </span>
        <span className={"flex flex-col lg:flex-row gap-2"}>
          <span
            className={"text-placeholder"}
            style={{ fontFamily: "PlaywriteNZGuides" }}
          >
            Remining
          </span>
          {convertToCurrency(remining)}
        </span>
      </section>
    </li>
  );
};

export default BudgetItems;
