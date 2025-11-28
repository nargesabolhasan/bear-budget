"use client";
import React, { useState } from "react";
import TransactionListComponent from "@/components/transaction-list";
import Modal from "@mui/material/Modal";
import { ViewEnums } from "@/types/global";
import useSearchTransaction from "@/hooks/useSearchTransaction";
import { PERSIAN_MONTHS } from "@/utils/dateList";
import Box from "@mui/material/Box";
import DateFilteredTransactions from "@/components/date-filter/dateFilteredTransactions";

const TransactionList = () => {
  const [viewMode, setViewMode] = useState<ViewEnums>(ViewEnums.SUPERGROUP);
  const [open, setOpen] = useState<boolean>(false);

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

  const { submitSearch, groupedTransactions, transactionList } =
    useSearchTransaction({
      monthList: PERSIAN_MONTHS,
      handleClose,
    });

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
        transactions={transactionList}
        groupedTransactions={groupedTransactions}
        handleChangeTab={handleChangeTab}
        viewMode={viewMode}
      />
    </div>
  );
};

export default TransactionList;
