import { TransactionEnum, TransactionType } from "@/types/global";
import { TagsListType } from "@/store/tags/type";
import { useState, useRef, useEffect } from "react";
import useCalendarUtils from "@/hooks/useCalendarUtils";
import i18n from "i18next";

type Props = {
  allTransactions: TransactionType[];
  tags: TagsListType;
};

const SYSTEM_TAGS = ["previousMonth"];

const SYSTEM_DESCRIPTIONS = [
  "previous_month_balance",
  "previous_month_savings",
];

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

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (!q) {
        setSearchResult(allTransactions);
        return;
      }

      const result = allTransactions.filter((transaction) => {
        const tagInfo = tags?.[transaction.tag];

        const tagName =
          tagInfo && SYSTEM_TAGS.includes(tagInfo.name)
            ? i18n.t(`transactions.system.${tagInfo.name}`)
            : tagInfo?.name ?? "";

        const description =
          transaction.description &&
          SYSTEM_DESCRIPTIONS.includes(transaction.description)
            ? i18n.t(`transactions.system.${transaction.description}`)
            : transaction.description ?? "";

        return (
          formatDate(transaction.date)?.toLowerCase().includes(q) ||
          description.toLowerCase().includes(q) ||
          transaction.amount?.toString().includes(q) ||
          formatDate(transaction.settled?.date as string)
            ?.toLowerCase()
            .includes(q) ||
          transaction.settled?.amount?.toString().includes(q) ||
          i18n
            .t(`transactions.${tagInfo?.transactionType}`)
            .toLowerCase()
            .includes(q) ||
          tagName.toLowerCase().includes(q) ||
          ((tagInfo?.transactionType === TransactionEnum.DEBT ||
            tagInfo?.transactionType === TransactionEnum.CREDIT) &&
            !Boolean(transaction.settled) &&
            i18n.t("transactionList.settled").toLowerCase().includes(q))
        );
      });

      setSearchResult(result);
    }, 300);
  };

  return {
    searchResult,
    onSearch,
    notFound:
      allTransactions.length > 0 && searchResult.length === 0,
  };
};

export default useSearchTransaction;