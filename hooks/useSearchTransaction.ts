import { TransactionEnum, TransactionType } from "@/types/global";
import { TagsListType } from "@/store/tags/type";
import { useState, useRef, useEffect } from "react";
import useCalendarUtils from "@/hooks/useCalendarUtils";

type Props = {
  allTransactions: TransactionType[];
  tags: TagsListType;
};

const useSearchTransaction = ({ allTransactions, tags }: Props) => {
  const [searchResult, setSearchResult] =
    useState<TransactionType[]>(allTransactions);

  const { formatDate } = useCalendarUtils();

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSearchResult(allTransactions);
  }, [allTransactions]);

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
        console.log(transaction.date?.toLowerCase());
        return (
          formatDate(transaction.date)?.toLowerCase().includes(q) ||
          transaction.description?.toLowerCase().includes(q) ||
          transaction.amount?.toString().includes(q) ||
          formatDate(transaction.settled?.date as string)
            ?.toLowerCase()
            .includes(q) ||
          transaction.settled?.amount?.toString().includes(q) ||
          tagInfo?.transactionType?.toLowerCase().includes(q) ||
          tagInfo?.name?.toLowerCase().includes(q) ||
          ((tagInfo?.transactionType === TransactionEnum.DEBT ||
            tagInfo?.transactionType === TransactionEnum.LOANED) &&
            !Boolean(transaction?.settled) &&
            (q.toLowerCase() === "settled" || q.includes("تسویه")))
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
