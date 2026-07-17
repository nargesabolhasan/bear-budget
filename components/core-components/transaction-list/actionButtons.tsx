"use client";
import ContextMenu from "@/components/molecules/contextMenu";
import { openDialog } from "@/components/molecules/dialogContainer";
import { transactionRoutes } from "@/routes/routes";
import { TagsListType } from "@/store/tags/type";
import { useTransactionStore } from "@/store/transaction";
import { TransactionType } from "@/types/global";
import { convertToCurrency } from "@/utils/utils";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import i18next from "i18next";
import { Edit2, Trash } from "iconsax-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ActionButtons = ({
  transaction,
  tags,
}: {
  transaction: TransactionType;
  tags: TagsListType;
}) => {
  const { removeTransaction } = useTransactionStore();
  const router = useRouter();

  const handleDelete = (transaction: TransactionType) => {
    openDialog({
      title: i18next.t("dialog.remove", {
        value: i18next.t("global.transaction"),
      }),
      hint: (
        <span>
          {i18next.t("transactionList.removeHint", {
            amount: convertToCurrency(transaction.amount),
            tag: tags?.[transaction.tag]?.name,
            type: i18next.t(
              `transactions.${tags?.[transaction.tag]?.transactionType}`,
            ),
          })}
        </span>
      ),
      confirmHandler: () => {
        removeTransaction(transaction.id);
        toast.success(
          i18next.t("setting.successDelete", {
            value: i18next.t("global.transaction"),
          }),
        );
      },
    });
  };

  const menuItems = [
    {
      id: 11,
      onClick: () =>
        router.push(transactionRoutes.editTransaction(transaction.id)),
      title: (
        <span
          className={"w-full flex flex-row gap-2 items-center justify-start"}
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
      id: 22,
      onClick: () => handleDelete(transaction),
      title: (
        <span
          className={"!text-sm flex flex-row gap-2 items-center justify-start"}
        >
          <Trash size="30" color={"var(--color-primary)"} variant="Bulk" />
          {i18next.t("contextMenu.delete")}
        </span>
      ),
    },
  ];

  return (
    <ContextMenu menuItems={menuItems} resetAfterSelect>
      <MoreHorizTwoToneIcon className={"cursor-pointer"} />
    </ContextMenu>
  );
};

export default ActionButtons;
