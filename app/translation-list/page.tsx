"use client";

import TransactionListContainer from "@/components/transaction-list";
import { FilteredDateProvider } from "@/context/filteredDateContext";

const TransactionPage = () => {
  return (
    <FilteredDateProvider>
      <TransactionListContainer />
    </FilteredDateProvider>
  );
};

export default TransactionPage;
