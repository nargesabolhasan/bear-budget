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
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import { transactionRoutes } from "@/routes/routes";
import Link from "next/link";
import useCalendarUtils from "@/hooks/useCalendarUtils";
import { useQuery } from "@tanstack/react-query";
import api, { API_URL } from "@/utils/axios";
import i18n from "@/i18n/config";

const TransactionSummery = () => {
  const { groupedByType } = useTransactionStore();
  const { getCurrentYear, getCurrentMonthNumber, toStandardISO, isJalali } =
    useCalendarUtils();

  const isoDate = toStandardISO({
    year: getCurrentYear(),
    month: getCurrentMonthNumber(),
  });

  const grouped = groupedByType(
    isoDate.year,
    isoDate.month,
    isJalali,
    getCurrentMonthNumber(),
  );

  const { data, isLoading } = useQuery({
    queryKey: [API_URL.userInfo.queryKey],
    queryFn: async () => {
      const res = await api.get(API_URL.userInfo.api);
      return res.data;
    },
  });

  const username = data?.username;

  return (
    <section
      className={
        "from-primary to-primary_light rounded-2xl bg-gradient-to-b p-3 pb-6"
      }
    >
      <div className={"flex flex-row items-center justify-center gap-1"}>
        <Image
          src="/bear.png"
          alt="icon"
          width={100}
          height={100}
          priority
          unoptimized
        />
        <h2 className={"text-brown grow text-xl"}>
          {i18n.t("home.hello")}{" "}
          {isLoading ? (
            <div className="bg-placeholder_light h-5 w-32 animate-pulse rounded-full"></div>
          ) : (
            username
          )}
        </h2>
      </div>
      <div className={"flex flex-col gap-4 italic"}>
        <TableContainer>
          <Table aria-label="transaction table" size="small">
            <TableHead>
              <TableRow>
                <TableCell align="inherit">
                  <Typography style={{ fontWeight: "bold" }}>
                    {i18n.t("home.type")}
                  </Typography>
                </TableCell>
                <TableCell align="inherit">
                  <Typography style={{ fontWeight: "bold" }}>
                    {i18n.t("home.amount")}
                  </Typography>
                </TableCell>
                <TableCell align="inherit">
                  <Typography style={{ fontWeight: "bold" }}>
                    {i18n.t("home.entries")}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(grouped).length > 0 ? (
                <>
                  {Object.entries(grouped).map(([key, value]) => (
                    <TableRow key={`transaction_row_${key}`}>
                      <TableCell
                        align="inherit"
                        sx={{
                          borderBottom: "1px solid var(--color-neutral_light)",
                        }}
                      >
                        {i18n.t(
                          `transactions.${key.charAt(0).toUpperCase() + key.slice(1)}`,
                        )}
                      </TableCell>
                      <TableCell
                        align="inherit"
                        sx={{
                          borderBottom: "1px solid var(--color-neutral_light)",
                        }}
                      >
                        $ {convertToCurrency(value?.totalAmount)}
                      </TableCell>
                      <TableCell
                        align="inherit"
                        sx={{
                          borderBottom: "1px solid var(--color-neutral_light)",
                        }}
                      >
                        {value?.transactions.length}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <>
                  {
                    <TableRow>
                      <TableCell align="inherit">
                        <Link href={transactionRoutes.addTranslation.href}>
                          <AddCircleTwoToneIcon className={"mx-1"} />
                          {i18n.t("global.add")}
                        </Link>
                      </TableCell>
                      <TableCell align="inherit">0 $</TableCell>
                      <TableCell align="inherit">0 $</TableCell>
                    </TableRow>
                  }
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </section>
  );
};

export default TransactionSummery;
