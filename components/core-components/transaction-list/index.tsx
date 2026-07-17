"use client";
import React, { useState } from "react";
import { ViewEnums } from "@/types/global";
import DateFilteredTransactions, {
  DatePickerForm,
} from "@/components/core-components/date-filter/dateFilteredTransactions";
import { useTransactionStore } from "@/store/transaction";
import { useFilteredDateContext } from "@/context/filteredDateContext";
import TransactionListComponent from "@/components/core-components/transaction-list/TransactionListComponent";
import useCalendarUtils from "@/hooks/useCalendarUtils";
import { useTranslation } from "react-i18next";
import IModal from "@/components/molecules/modal";

const TransactionListContainer = () => {
  const [viewMode, setViewMode] = useState<ViewEnums>(ViewEnums.ALL);
  const [open, setOpen] = useState<boolean>(false);

  const { t } = useTranslation();

  const { date, saveDate } = useFilteredDateContext();

  const { isJalali } = useCalendarUtils();

  const { getTransactions, groupedByType, removeByYearMonth } =
    useTransactionStore();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setViewMode(ViewEnums.ALL);
  };

  const handleChangeTab = (id: number) => {
    setViewMode(id);
    if (id === ViewEnums.PREV_MONTHS) {
      handleOpen();
    }
  };

  const submitSearch = (
    _: DatePickerForm,
    formatedDate: {
      year: number;
      month: number;
      monthName: string;
    },
  ) => {
    saveDate(formatedDate);
    handleClose();
  };

  return (
    <div>
      <IModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-date-Filter"
        aria-describedby="modal-selected-date-Filter"
      >
        <DateFilteredTransactions submitSearch={submitSearch} />
      </IModal>
      <TransactionListComponent
        transactions={getTransactions(
          date.year,
          date.month,
          isJalali,
          date.notIso.month,
        )}
        groupedTransactions={groupedByType(
          date.year,
          date.month,
          isJalali,
          date.notIso.month,
        )}
        handleChangeTab={handleChangeTab}
        viewMode={viewMode}
        clearAll={() => removeByYearMonth(date, isJalali)}
        dialogTitle={t("transactionList.deleteAll", {
          value: `${date.notIso.monthName} ${date.notIso.year}`,
        })}
      />
    </div>
  );
};

export default TransactionListContainer;
