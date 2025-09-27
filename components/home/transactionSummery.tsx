"use client";

import React from "react";
import Image from "next/image";
import { convertToCurrency } from "@/utils/utils";
import { useTransactionStore } from "@/store/transaction";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import IButton from "@/components/atoms/button";

const TransactionSummery = () => {
  const { groupedByType } = useTransactionStore();
  const grouped = groupedByType();

  return (
    <section
      className={
        "bg-gradient-to-b from-primary to-primary_light rounded-2xl p-3 pb-6"
      }
    >
      <div className={"flex flex-row justify-center items-center gap-1"}>
        <Image src="/favicon.svg" alt="icon" width={100} height={100} />
        <h2 className={"text-xl grow"}>hello Narges</h2>
      </div>
      <div className={"flex flex-col gap-4 italic"}>
        <TableContainer>
          <Table aria-label="transaction table" size="small">
            <TableHead>
              <TableRow>
                <TableCell align="right">
                  <Typography style={{ fontWeight: "bold" }}>
                    Grouped
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography style={{ fontWeight: "bold" }}>Amount</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography style={{ fontWeight: "bold" }}>
                    Entries
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(grouped).map(([key, value]) => (
                <TableRow key={`transaction_row_${key}`}>
                  <TableCell
                    align="right"
                    sx={{
                      borderBottom: "1px solid var(--color-neutral_light)",
                    }}
                  >
                    {key}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      borderBottom: "1px solid var(--color-neutral_light)",
                    }}
                  >
                    $ {convertToCurrency(value?.totalAmount)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      borderBottom: "1px solid var(--color-neutral_light)",
                    }}
                  >
                    {value?.transactions.length}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </section>
  );
};

export default TransactionSummery;
