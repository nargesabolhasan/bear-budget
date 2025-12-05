import { TransactionType } from "@/types/global";
import { TagsListType } from "@/store/tags/type";
import { useState, useRef } from "react";

type Props = {
  allTransactions: TransactionType[];
  tags: TagsListType;
};

const useSearchTransaction = ({ allTransactions, tags }: Props) => {
  const [searchResult, setSearchResult] =
    useState<TransactionType[]>(allTransactions);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const onSearch = (query: string) => {
    const q = query.trim().toLowerCase();

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (!q) {
        setSearchResult(allTransactions);
        return;
      }

      const result = allTransactions.filter((transaction) => {
        const tagInfo = tags?.[transaction.tag];

        return (
          transaction.date?.toLowerCase().includes(q) ||
          transaction.description?.toLowerCase().includes(q) ||
          transaction.amount?.toString().toLowerCase().includes(q) ||
          transaction.settled?.date?.toLowerCase().includes(q) ||
          transaction.settled?.amount?.toString().toLowerCase().includes(q) ||
          tagInfo?.transactionType?.toLowerCase().includes(q) ||
          tagInfo?.name?.toLowerCase().includes(q)
        );
      });

      setSearchResult(result);
    }, 300);
  };

  return {
    searchResult,
    onSearch,
    notFound: allTransactions.length > 0 && searchResult.length === 0,
  };
};

export default useSearchTransaction;
