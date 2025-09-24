"use client";
import React, { useState } from "react";
import { useTransactionStore } from "@/store/transaction";
import { transactionRoutes } from "@/constant/routes";
import { TransactionEnum } from "@/types/global";
import { openDialog } from "@/components/molecules/dialogContainer";
import { Render } from "@/utils/render";
import EmptyList from "@/components/molecules/emptyList";
import { useRouter } from "next/navigation";
import SuperGroupList from "@/components/transaction-list/super-group-view";
import ScrollToBottom from "@/components/molecules/scrollToBottom";
import { TransactionInfoType } from "@/store/transaction/type";
import FilterButtons, {
  NavItemsType,
} from "@/components/molecules/filterButtons";
import AllTransactions from "@/components/transaction-list/all-view";
import { filterTransactionList } from "@/constant";
import TagListHeader from "@/components/tag-list/tagListHeader";
import FilterView from "@/components/transaction-list/filters-view";

const enum ViewEnums {
  SUPERGROUP,
  ALL,
  GROUPED,
}

const navItems: NavItemsType[] = [
  { id: ViewEnums.SUPERGROUP, title: "Grouped" },
  { id: ViewEnums.ALL, title: "All" },
  {
    id: ViewEnums.GROUPED,
    title: "Filter",
    showContextMenu: true,
    contextMenu: filterTransactionList(),
  },
];

const TransactionList = () => {
  const [viewMode, setViewMode] = useState<ViewEnums>(ViewEnums.SUPERGROUP);
  const [selectedMenuFilter, setSelectedMenuFilter] = useState<string>("");

  const { transactions, clearAll, groupedByType } = useTransactionStore();

  const groupedTransactions = groupedByType();

  const router = useRouter();

  const clearAllTransactions = () => {
    openDialog({
      title: "Clear All",
      hint: "Do you want to remove all transaction ?",
      confirmHandler: () => clearAll(),
    });
  };

  return (
    <div className={"p-1 w-fit mx-auto"}>
      <Render
        items={[
          {
            when: viewMode === ViewEnums.ALL && transactions.length > 0,
            render: <AllTransactions transactions={transactions} />,
          },
          {
            when: viewMode === ViewEnums.GROUPED && transactions.length > 0,
            render: (
              <FilterView
                transactionType={selectedMenuFilter || TransactionEnum.INCOME}
                transactions={
                  (selectedMenuFilter &&
                    groupedTransactions?.[selectedMenuFilter]) ||
                  groupedTransactions.Income
                }
              />
            ),
          },
          {
            when: viewMode === ViewEnums.SUPERGROUP && transactions.length > 0,
            render: (
              <SuperGroupList
                groupedItems={
                  Object.entries(groupedTransactions) as [
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
            onAddItem={() => router.push(transactionRoutes.addTranslation.href)}
          />
        }
      >
        <header className={"bg-neutral_light"}>
          <TagListHeader
            clearAllTags={clearAllTransactions}
            handleAddMore={() => {
              router.push(transactionRoutes.addTranslation.href);
            }}
          />
          <FilterButtons
            activeId={viewMode}
            onChange={(id) => setViewMode(id)}
            navItems={navItems}
            selectedMenuFilter={selectedMenuFilter}
            setSelectedMenuFilter={setSelectedMenuFilter}
          />
        </header>
        <ScrollToBottom />
      </Render>
    </div>
  );
};

export default TransactionList;
