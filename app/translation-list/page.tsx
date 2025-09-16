"use client";
import React, { useState } from "react";
import { useTransactionStore } from "@/store/transaction";
import { translationRoutes } from "@/constant/routes";
import { TransactionEnum, TransactionType } from "@/types/global";
import { openDialog } from "@/components/molecules/dialogContainer";
import { Render } from "@/utils/render";
import EmptyList from "@/components/molecules/emptyList";
import { useRouter } from "next/navigation";
import SuperGroupList from "@/components/transaction-list/super-group-view";
import ScrollToBottom from "@/components/molecules/scrollToBottom";
import { TransactionInfoType } from "@/store/transaction/type";
import FilterButtons from "@/components/molecules/filterButtons";
import AllTransactions from "@/components/transaction-list/all-view";

const enum ViewEnums {
  SUPERGROUP,
  ALL,
  GROUPED,
}

const navItems = [
  { id: ViewEnums.SUPERGROUP, title: "Sort by group" },
  { id: ViewEnums.ALL, title: "All" },
  { id: ViewEnums.GROUPED, title: "Grouped" },
];

const TransactionList = () => {
  const [viewMode, setViewMode] = useState<ViewEnums>(ViewEnums.SUPERGROUP);
  const { transactions, removeTransaction, clearAll, groupedByType } =
    useTransactionStore();
  const router = useRouter();

  const handleDelete = (transaction: TransactionType) => {
    openDialog({
      title: "Remove transaction",
      hint: (
        <span>
          Remove : <strong>{transaction.amount}</strong> as
          <strong>{transaction.tag.name}</strong>
        </span>
      ),
      confirmHandler: () => {
        removeTransaction(transaction.id);
      },
    });
  };

  const clearAllTransactions = () => {
    openDialog({
      title: "Clear All",
      hint: "Do you want to remove all transaction ?",
      confirmHandler: () => clearAll(),
    });
  };

  return (
    <div>
      <Render
        items={[
          {
            when: viewMode === ViewEnums.ALL && transactions.length > 0,
            render: <AllTransactions transactions={transactions} />,
          },
          {
            when: viewMode === ViewEnums.GROUPED && transactions.length > 0,
            render: <div>Grouped view coming soon</div>,
          },
          {
            when: viewMode === ViewEnums.SUPERGROUP && transactions.length > 0,
            render: (
              <SuperGroupList
                groupedItems={
                  Object.entries(groupedByType()) as [
                    TransactionEnum,
                    TransactionInfoType
                  ][]
                }
              />
            ),
          },
        ]}
        fallback={
          <EmptyList
            onAddItem={() => router.push(translationRoutes.addTranslation.href)}
          />
        }
      >
        <FilterButtons
          activeId={viewMode}
          onChange={(id) => setViewMode(id)}
          navItems={navItems}
        />
        <ScrollToBottom />
      </Render>
    </div>
  );
};

export default TransactionList;
