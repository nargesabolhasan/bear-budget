import { TransactionEnum, TransactionType } from "@/types/global";
import { TagsListType } from "@/store/tags/type";
import { useState, useRef, useEffect } from "react";
import useCalendarUtils from "@/hooks/useCalendarUtils";
import i18n from "i18next";
import { SYSTEM_DESCRIPTIONS, SYSTEM_TAG } from "@/constant/global";

type Props = {
  allTransactions: TransactionType[];
  tags: TagsListType;
};

const SYSTEM_TAGS = [SYSTEM_TAG];

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
            : (tagInfo?.name ?? "");

        const systemDescriptionKey =
          transaction.systemKey &&
          SYSTEM_DESCRIPTIONS.includes(transaction.systemKey)
            ? transaction.systemKey
            : transaction.description &&
                SYSTEM_DESCRIPTIONS.includes(transaction.description)
              ? transaction.description
              : null;

        const description = systemDescriptionKey
          ? i18n.t(`transactions.system.${systemDescriptionKey}`)
          : (transaction.description ?? "");

        const transactionType = i18n.t(
          `transactions.${tagInfo?.transactionType}`,
        );

        const transactionDate = formatDate(transaction.date).toLowerCase();
        const settledDate = transaction.settled?.date
          ? formatDate(transaction.settled.date).toLowerCase()
          : "";

        const tokenizeDate = (text: string) =>
          text
            .replace(/[/-]/g, " ")
            .split(/\s+/)
            .map((item) => item.trim())
            .filter(Boolean);

        const transactionDateTokens = tokenizeDate(transactionDate);
        const settledDateTokens = tokenizeDate(settledDate);

        const isDateSearch = transactionDateTokens.includes(q);
        const isSettledDateSearch = settledDateTokens.includes(q);

        return (
          // Date (exact word match)
          isDateSearch ||
          isSettledDateSearch ||
          // Description
          description.toLowerCase().includes(q) ||
          // Amount
          transaction.amount.toString().includes(q) ||
          // Settled amount
          transaction.settled?.amount?.toString().includes(q) ||
          // Transaction type
          transactionType.toLowerCase().includes(q) ||
          // Tag
          tagName.toLowerCase().includes(q) ||
          // Debt / Credit state
          ((tagInfo?.transactionType === TransactionEnum.DEBT ||
            tagInfo?.transactionType === TransactionEnum.CREDIT) &&
            !transaction.settled &&
            i18n.t("transactionList.settled").toLowerCase().includes(q)) ||
          (Boolean(transaction.settled) &&
            i18n.t("transactionList.settledHint").toLowerCase().includes(q))
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
