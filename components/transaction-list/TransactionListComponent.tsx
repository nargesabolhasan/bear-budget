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
import SearchBar from "@/components/search";
import { useTagsStore } from "@/store/tags";
import useSearchTransaction from "@/hooks/useSearchTransaction";

const navItems: NavItemsType[] = [
  {
    id: ViewEnums.PREV_MONTHS,
    title: "Previous months",
  },
  { id: ViewEnums.ALL, title: "All" },
  { id: ViewEnums.GROUPED, title: "Grouped" },
  {
    id: ViewEnums.FILTERS,
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
  const [selectedMenuFilter, setSelectedMenuFilter] = useState<string>(
    TransactionEnum.EXPENSE
  );

  const { tags } = useTagsStore();

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
    <div className={"md:w-fit mx-auto md:px-3 pb-25 print:p-0"}>
      <header className={"bg-neutral_light"}>
        <TagListHeader
          disableDelete={transactions.length === 0}
          disablePrint={transactions.length === 0}
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
      {viewMode === ViewEnums.GROUPED && <ScrollToBottom />}
      <Render
        items={[
          {
            when: viewMode === ViewEnums.ALL && transactions.length > 0,
            render: <AllTransactions tags={tags} transactions={transactions} />,
          },
          {
            when: viewMode === ViewEnums.GROUPED && transactions.length > 0,
            render: (
              <SuperGroupList
                tags={tags}
                groupedItems={
                  Object.entries(groupedTransactions) as [
                    TransactionEnum,
                    TransactionInfoType
                  ][]
                }
              />
            ),
          },
          {
            when: viewMode === ViewEnums.FILTERS && transactions.length > 0,
            render: (
              <FilterView
                tags={tags}
                transactionType={selectedMenuFilter || TransactionEnum.EXPENSE}
                transactions={
                  (selectedMenuFilter &&
                    groupedTransactions?.[selectedMenuFilter]) ||
                  groupedTransactions.EXPENSES
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
