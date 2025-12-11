"use client";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { ViewEnums } from "@/types/global";
import Box from "@mui/material/Box";
import DateFilteredTransactions from "@/components/date-filter/dateFilteredTransactions";
import { useTransactionStore } from "@/store/transaction";
import { PERSIAN_MONTHS } from "@/utils/dateList";
import { useFilteredDateContext } from "@/context/filteredDateContext";
import TransactionListComponent from "@/components/transaction-list/TransactionListComponent";

const TransactionListContainer = () => {
  const [viewMode, setViewMode] = useState<ViewEnums>(ViewEnums.ALL);
  const [open, setOpen] = useState<boolean>(false);
  const { date } = useFilteredDateContext();

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
        transactions={getTransactions(date.year, date.month)}
        groupedTransactions={groupedByType(date.year, date.month)}
        handleChangeTab={handleChangeTab}
        viewMode={viewMode}
        clearAll={() => removeByYearMonth(date.year, date.month)}
        dialogTitle={`All transactions from ${PERSIAN_MONTHS[date.month]} ${
          date.year
        } will be deleted.`}
      />
    </div>
  );
};

export default TransactionListContainer;
