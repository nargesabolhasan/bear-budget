"use client";
import React from "react";
import { useTransactionStore } from "@/store/transaction";
import { TransactionType } from "@/types/global";
import { openDialog } from "@/components/molecules/dialogContainer";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { transactionRoutes } from "@/constant/routes";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";

import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";

import ContextMenu from "@/components/molecules/contextMenu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ActionButtons = ({ transaction }: { transaction: TransactionType }) => {
  const { removeTransaction } = useTransactionStore();
  const router = useRouter();

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
        removeTransaction(transaction.id);
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
          <BorderColorRoundedIcon fontSize="small" className={"text-primary"} />
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
          <DeleteRoundedIcon className={"text-placeholder"} />
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
