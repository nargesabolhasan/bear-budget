import React, { useState } from "react";
import { Render } from "@/utils/render";
import AllTransactions from "@/components/transaction-list/all-view";
import FilterView from "@/components/transaction-list/filters-view";
import { TransactionEnum, TransactionType, ViewEnums } from "@/types/global";
import SuperGroupList from "@/components/transaction-list/super-group-view";
import {
  GroupedTransactionType,
  TransactionInfoType,
} from "@/store/transaction/type";
import EmptyList from "@/components/molecules/emptyList";
import { transactionRoutes } from "@/routes/routes";
import TagListHeader from "@/components/tag-list/tagListHeader";
import FilterButtons, {
  NavItemsType,
} from "@/components/molecules/filterButtons";
import ScrollToBottom from "@/components/molecules/scrollToBottom";
import { openDialog } from "@/components/molecules/dialogContainer";
import { filterTransactionList } from "@/constant";
import { useTransactionStore } from "@/store/transaction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const navItems: NavItemsType[] = [
  {
    id: ViewEnums.PREV_MONTHS,
    title: "Previous months",
  },
  { id: ViewEnums.SUPERGROUP, title: "Grouped" },
  { id: ViewEnums.ALL, title: "All" },
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
};

const TransactionListComponent = ({
  transactions,
  groupedTransactions,
  viewMode,
  handleChangeTab,
}: Props) => {
  const [selectedMenuFilter, setSelectedMenuFilter] = useState<string>("");
  const { clearAll } = useTransactionStore();
  const router = useRouter();

  const clearAllTransactions = () => {
    openDialog({
      title: "Clear All",
      hint: "Do you want to remove all transaction ?",
      confirmHandler: () => {
        clearAll();
        toast.success(<span>Deleted successfully.</span>);
      },
    });
  };

  return (
    <div className={"md:w-fit mx-auto md:px-3 pb-20 print:p-0"}>
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
            onChange={handleChangeTab}
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

export default TransactionListComponent;
