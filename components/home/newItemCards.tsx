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
import { getCurrentMonthNumber, getCurrentYear } from "@/utils/dateList";
import i18next from "i18next";

const NewItemCards = () => {
  const { tags } = useTagsStore();
  const { getTransactions } = useTransactionStore();

  const lastTransaction = getTransactions(
    getCurrentYear("fa"),
    getCurrentMonthNumber("fa")
  )[0];
  const lastTag = Object.values(tags).reverse()[0];
  const secondTag = Object.values(tags).reverse()[1];

  const Icon = iconList.get(lastTag?.icon || "0")?.icon || (() => <></>);
  const IconSecond =
    (secondTag && iconList.get(secondTag?.icon || "0")?.icon) || (() => <></>);

  const tableRows = [
    { id: 1, title: "Tag", value: tags?.[lastTransaction?.tag]?.name },
    {
      id: 2,
      title: "Amount",
      value: `${convertToCurrency(lastTransaction?.amount)} $`,
    },
    { id: 3, title: "Date", value: lastTransaction?.date },
  ];

  const FallBack = ({ title, href }: { title: string; href: string }) => (
    <Link href={href} className={"text-dark"}>
      <AutoFixHighIcon /> {title}
    </Link>
  );

  return (
    <section className={"grid grid-cols-1 sm:grid-cols-2 gap-3"}>
      <div
        className={
          "bg-gradient-to-t from-secondary to-burly_wood rounded-2xl p-3 flex flex-col"
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
          <span className={"text-dark flex flex-row gap-2 items-center mb-5"}>
            <TipsAndUpdatesIcon />
            <h4 className={"grow"}> {i18next.t("home.recent")} :</h4>
            <Link
              href={transactionRoutes.translationList.href}
              className={
                "bg-neutral text-secondary p-1 text-sm mx-auto rounded-full px-2"
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
                      align="right"
                      sx={{
                        borderBottom: "1px solid var(--color-neutral_light)",
                      }}
                    >
                      {title}
                    </TableCell>
                    <TableCell
                      align="right"
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
          "bg-gradient-to-b from-secondary to-burly_wood rounded-2xl p-3 flex flex-col gap-2"
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
          <span className={"text-dark flex flex-row gap-2 items-center mb-5"}>
            <AssistantIcon />
            <h4 className={"grow"}>{i18next.t("home.recent")}</h4>
            <Link
              href={tagRoutes.tagList.href}
              className={
                "bg-neutral text-secondary py-1 px-2 text-sm rounded-full"
              }
            >
              {i18next.t("home.seeMore")}
            </Link>
          </span>
          <span
            className={
              "p-2 rounded-full border border-neutral flex flex-row gap-3 items-center justify-center text-dark"
            }
          >
            <Icon /> <h4 className={"grow text-start"}>{lastTag?.name} </h4>
          </span>
          {secondTag && (
            <span
              className={
                "p-2 rounded-full border border-neutral flex flex-row gap-3 items-center justify-center text-dark"
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
