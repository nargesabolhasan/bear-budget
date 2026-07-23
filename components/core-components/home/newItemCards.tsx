"use client";

import React from "react";
import { Render } from "@/utils/render";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import AssistantIcon from "@mui/icons-material/Assistant";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import Link from "next/link";
import { useTagsStore } from "@/store/tags";
import { useTransactionStore } from "@/store/transaction";
import { iconList } from "@/constant/icons";
import { convertToCurrency } from "@/utils/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { tagRoutes, transactionRoutes } from "@/routes/routes";
import useCalendarUtils from "@/hooks/useCalendarUtils";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const NewItemCards = () => {
  const { tags } = useTagsStore();
  const { getTransactions } = useTransactionStore();
  const { t } = useTranslation();

  const {
    getCurrentYear,
    getCurrentMonthNumber,
    toStandardISO,
    formatDate,
    isJalali,
  } = useCalendarUtils();

  const isoCurrentDate = toStandardISO({
    year: getCurrentYear(),
    month: getCurrentMonthNumber(),
  });

  const lastTransaction = getTransactions(
    isoCurrentDate.year,
    isoCurrentDate.month,
    isJalali,
    getCurrentMonthNumber(),
  )[0];
  const lastTag = Object.values(tags).reverse()[0];
  const secondTag = Object.values(tags).reverse()[1];

  const Icon = iconList.get(lastTag?.icon || "0")?.icon || (() => <></>);
  const IconSecond =
    (secondTag && iconList.get(secondTag?.icon || "0")?.icon) || (() => <></>);

  const tableRows = [
    {
      id: 1,
      title: t("global.tag"),
      value: tags?.[lastTransaction?.tag]?.name,
    },
    {
      id: 2,
      title: t("home.amount"),
      value: `${convertToCurrency(lastTransaction?.amount)} $`,
    },
    {
      id: 3,
      title: t("addTransaction.date"),
      value: formatDate(lastTransaction?.date, true),
    },
  ];

  const FallBack = ({ title, href }: { title: string; href: string }) => (
    <Link
      href={href}
      className={
        "text-dark flex h-full flex-col items-center justify-center gap-3"
      }
    >
      <AutoFixHighIcon /> {title}
    </Link>
  );

  return (
    <section className={"grid grid-cols-1 gap-3 sm:grid-cols-2"}>
      <div
        className={
          "from-secondary to-burly_wood flex flex-col rounded-2xl bg-gradient-to-t p-3"
        }
      >
        {/*   Transaction   */}

        <Render
          when={!!lastTransaction}
          fallback={
            <FallBack
              title={i18next.t("home.create", {
                value: i18next.t("global.transactions"),
              })}
              href={transactionRoutes.addTranslation.href}
            />
          }
        >
          <span className={"text-dark mb-5 flex flex-row items-center gap-2"}>
            <TipsAndUpdatesIcon />
            <h4 className={"grow"}> {i18next.t("home.recent")} :</h4>
            <Link
              href={transactionRoutes.translationList.href}
              className={
                "bg-neutral text-secondary mx-auto rounded-full p-1 px-2 text-sm"
              }
            >
              {i18next.t("home.seeMore")}
            </Link>
          </span>
          <TableContainer>
            <Table aria-label="transaction table" size="small">
              <TableBody>
                {tableRows.map(({ title, value, id }) => (
                  <TableRow key={`table_row_${id}`}>
                    <TableCell
                      align="inherit"
                      sx={{
                        borderBottom: "1px solid var(--color-neutral_light)",
                      }}
                    >
                      {title}
                    </TableCell>
                    <TableCell
                      align="inherit"
                      sx={{
                        borderBottom: "1px solid var(--color-neutral_light)",
                      }}
                    >
                      {value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Render>
      </div>
      <div
        className={
          "from-secondary to-burly_wood flex flex-col gap-2 rounded-2xl bg-gradient-to-b p-3"
        }
      >
        {/*   Tags   */}
        <Render
          when={!!lastTag}
          fallback={
            <FallBack
              title={i18next.t("home.create", {
                value: i18next.t("global.tags"),
              })}
              href={tagRoutes.createTag.href}
            />
          }
        >
          <span className={"text-dark mb-5 flex flex-row items-center gap-2"}>
            <AssistantIcon />
            <h4 className={"grow"}>{i18next.t("home.recent")}</h4>
            <Link
              href={tagRoutes.tagList.href}
              className={
                "bg-neutral text-secondary rounded-full px-2 py-1 text-sm"
              }
            >
              {i18next.t("home.seeMore")}
            </Link>
          </span>
          <span
            className={
              "border-neutral text-dark flex flex-row items-center justify-center gap-3 rounded-full border p-2"
            }
          >
            <Icon /> <h4 className={"grow text-start"}>{lastTag?.name} </h4>
          </span>
          {secondTag && (
            <span
              className={
                "border-neutral text-dark flex flex-row items-center justify-center gap-3 rounded-full border p-2"
              }
            >
              <IconSecond />
              <h4 className={"grow text-start"}>{secondTag?.name} </h4>
            </span>
          )}
        </Render>
      </div>
    </section>
  );
};

export default NewItemCards;
