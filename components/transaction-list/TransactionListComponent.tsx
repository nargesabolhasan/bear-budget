"use client";
import React, { useState } from "react";
import { Render } from "@/utils/render";
import AllTransactions from "@/components/transaction-list/all-view";
import FilterView from "@/components/transaction-list/filters-view";
import { TransactionEnum, TransactionType, ViewEnums } from "@/types/global";
import SuperGroupList from "@/components/transaction-list/super-group-view";

import EmptyList from "@/components/molecules/emptyList";
import { transactionRoutes } from "@/routes/routes";
import TagListHeader from "@/components/tag-list/tagListHeader";
import FilterButtons, {
  NavItemsType,
} from "@/components/molecules/filterButtons";
import ScrollToBottom from "@/components/molecules/scrollToBottom";
import { openDialog } from "@/components/molecules/dialogContainer";
import { filterTransactionList } from "@/constant";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  GroupedTransactionType,
  TransactionInfoType,
} from "@/store/transaction/type";

const navItems: NavItemsType[] = [
  {
    id: ViewEnums.PREV_MONTHS,
    title: "Previous months",
  },
  { id: ViewEnums.ALL, title: "All" },
  { id: ViewEnums.SUPERGROUP, title: "Grouped" },
  {
    id: ViewEnums.GROUPED,
    title: "Filter",
    showContextMenu: true,
    contextMenu: filterTransactionList(),
  },
];

type Props = {
  transactions: TransactionType[];
  groupedTransactions: GroupedTransactionType;
  viewMode: ViewEnums;
  handleChangeTab: (id: number) => void;
  clearAll: () => void;
  dialogTitle: string;
};

const TransactionListComponent = ({
  transactions,
  groupedTransactions,
  viewMode,
  handleChangeTab,
  clearAll,
  dialogTitle,
}: Props) => {
  const [selectedMenuFilter, setSelectedMenuFilter] = useState<string>("");
  const router = useRouter();

  const clearAllTransactions = () => {
    openDialog({
      title: "Clear All",
      hint: dialogTitle,
      confirmHandler: () => {
        clearAll();
        toast.success(<span>Deleted successfully.</span>);
      },
    });
  };

  return (
    <div className={"md:w-fit mx-auto md:px-3 pb-20 print:p-0"}>
      <header className={"bg-neutral_light"}>
        <TagListHeader
          clearAllTags={clearAllTransactions}
          handleAddMore={() => {
            router.push(transactionRoutes.addTranslation.href);
          }}
        />
        <FilterButtons
          activeId={viewMode}
          onChange={handleChangeTab}
          navItems={navItems}
          selectedMenuFilter={selectedMenuFilter}
          setSelectedMenuFilter={setSelectedMenuFilter}
        />
      </header>
      <ScrollToBottom />
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
      />
    </div>
  );
};

export default TransactionListComponent;
