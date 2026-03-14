"use client";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { ViewEnums } from "@/types/global";
import Box from "@mui/material/Box";
import DateFilteredTransactions from "@/components/inner-components/date-filter/dateFilteredTransactions";
import { useTransactionStore } from "@/store/transaction";
import { useFilteredDateContext } from "@/context/filteredDateContext";
import TransactionListComponent from "@/components/inner-components/transaction-list/TransactionListComponent";
import useCalendarUtils from "@/hooks/useCalendarUtils";
import { useTranslation } from "react-i18next";

const TransactionListContainer = () => {
  const [viewMode, setViewMode] = useState<ViewEnums>(ViewEnums.ALL);
  const [open, setOpen] = useState<boolean>(false);

  const { t } = useTranslation();

  const { date } = useFilteredDateContext();

  const { isJalali } = useCalendarUtils();

  const { getTransactions, groupedByType, removeByYearMonth, transactions } =
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

  const submitSearch = () => {
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "var(--color-neutral)",
            borderRadius: 15,
            boxShadow: 15,
            p: 4,
            width: "fit-content",
            height: "fit-content",
          }}
        >
          <DateFilteredTransactions submitSearch={submitSearch} />
        </Box>
      </Modal>
      <TransactionListComponent
        transactions={getTransactions(
          date.year,
          date.month,
          isJalali,
          date.notIso.month
        )}
        groupedTransactions={groupedByType(
          date.year,
          date.month,
          isJalali,
          date.notIso.month
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
