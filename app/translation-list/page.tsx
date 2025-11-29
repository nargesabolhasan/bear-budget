"use client";
import React, { useState } from "react";
import TransactionListComponent from "@/components/transaction-list";
import Modal from "@mui/material/Modal";
import { ViewEnums } from "@/types/global";
import Box from "@mui/material/Box";
import DateFilteredTransactions from "@/components/date-filter/dateFilteredTransactions";
import { useTransactionStore } from "@/store/transaction";
import { PERSIAN_MONTHS } from "@/utils/dateList";
import {
  FilteredDateProvider,
  useFilteredDateContext,
} from "@/context/filteredDateContext";

const TransactionList = () => {
  const [viewMode, setViewMode] = useState<ViewEnums>(ViewEnums.ALL);
  const [open, setOpen] = useState<boolean>(false);
  const { date } = useFilteredDateContext();

  const { getTransactions, groupedByType, removeByYearMonth } =
    useTransactionStore();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setViewMode(ViewEnums.SUPERGROUP);
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
      <FilteredDateProvider>
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
              bgcolor: "var(--color-neutral_light)",
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
      </FilteredDateProvider>
    </div>
  );
};

export default TransactionList;
