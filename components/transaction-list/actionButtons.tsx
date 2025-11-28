"use client";
import React from "react";
import { useTransactionStore } from "@/store/transaction";
import { TransactionType } from "@/types/global";
import { openDialog } from "@/components/molecules/dialogContainer";
import { transactionRoutes } from "@/routes/routes";

import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";

import ContextMenu from "@/components/molecules/contextMenu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Edit2, Trash } from "iconsax-react";
import { useFilteredDateContext } from "@/context/filteredDateContext";

const ActionButtons = ({ transaction }: { transaction: TransactionType }) => {
  const { removeTransaction } = useTransactionStore();
  const router = useRouter();
  const { date } = useFilteredDateContext();

  const handleDelete = (transaction: TransactionType) => {
    openDialog({
      title: "Remove transaction",
      hint: (
        <span>
          Remove : <strong>{transaction.amount}</strong> in{" "}
          <strong>{transaction.tag.name}</strong> tag as{" "}
          <strong>{transaction.tag.type}</strong>
        </span>
      ),
      confirmHandler: () => {
        removeTransaction(transaction.id, date.year, date.month);
        toast.success(<span>Deleted successfully.</span>);
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
          Edit
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
          Delete
        </span>
      ),
    },
  ];

  return (
    <ContextMenu menuItems={menuItems} resetAfterSelect>
      <MoreHorizTwoToneIcon />
    </ContextMenu>
  );
};

export default ActionButtons;
