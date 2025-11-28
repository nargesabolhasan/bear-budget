"use client";

import { useEffect, useState } from "react";
import { useTransactionStore } from "@/store/transaction";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { TransactionType } from "@/types/global";
import { getCurrentMonthName, getCurrentYear } from "@/utils/dateList";

type Props = {
  monthList: string[];
  handleClose?: () => void;
};

const useSearchTransaction = ({ monthList, handleClose }: Props) => {
  const [dataList, setDataList] = useState<TransactionType[]>([]);
  const { transactions, groupedByType } = useTransactionStore();

  const generateList = (Month: string, Year: number) => {
    return transactions.filter((item) => {
      const year = new Date(item?.date).getFullYear();
      const month = new Date(item?.date).getMonth();
      if (Year === year && Month === monthList[month]) return true;
    });
  };

  useEffect(() => {
    const newList = generateList(
      getCurrentMonthName("fa"),
      getCurrentYear("fa")
    );
    setDataList(newList);
  }, [transactions]);

  const submitSearch: SubmitHandler<FieldValues> = (formData) => {
    const newList = generateList(formData?.Month, formData?.Year);
    setDataList(newList);

    if (newList.length > 0) {
      handleClose?.();
    } else {
    }
  };

  return {
    submitSearch,
    groupedTransactions: groupedByType(dataList),
    transactionList: dataList,
  };
};

export default useSearchTransaction;
