import ILinearProgress from "@/components/atoms/linearProgress";
import TransactionBalance from "@/components/core-components/budget-list/transactionBalance";
import ContextMenu from "@/components/molecules/contextMenu";
import { TagType } from "@/types/global";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import i18next from "i18next";
import { Edit2, Trash } from "iconsax-react";
import { twMerge } from "tailwind-merge";
import TagIcon from "../create-tag/tagIcon";

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
  const usagePercent = Math.min((spent / budgetAmount) * 100, 100) || 0;
  const remining = budgetAmount - spent;

  const menuItems = [
    {
      id: 1,
      onClick: () => handleEdit(tagId),
      title: (
        <span
          className={"flex w-full flex-row items-center justify-start gap-2"}
        >
          <Edit2
            size="30"
            color={"var(--color-hover_primary)"}
            variant="Bulk"
          />
          {i18next.t("contextMenu.edit")}
        </span>
      ),
    },
    {
      id: 2,
      onClick: () => handleDelete(tagId),
      title: (
        <span
          className={"flex flex-row items-center justify-start gap-2 text-sm!"}
        >
          <Trash size="30" color={"var(--color-primary)"} variant="Bulk" />
          {i18next.t("contextMenu.delete")}
        </span>
      ),
    },
  ];

  return (
    <li
      key={tagId}
      className={
        "border-placeholder flex flex-col border-b border-dashed px-3 py-4"
      }
    >
      <div className={"flex w-full justify-end print:hidden"}>
        <ContextMenu menuItems={menuItems} resetAfterSelect>
          <MoreHorizTwoToneIcon className={"cursor-pointer"} />
        </ContextMenu>
      </div>
      <section className={"mb-8 grid grid-cols-3 items-center gap-2 md:gap-4"}>
        <span>
          <TagIcon fontSize="medium" tag={tag} />
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
      <TransactionBalance
        budgetAmount={budgetAmount}
        spent={spent}
        remining={remining}
      />
    </li>
  );
};

export default BudgetItems;
