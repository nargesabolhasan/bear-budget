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
  TableContainer,
  TableCell,
  TableRow,
} from "@mui/material";
import { tagRoutes, transactionRoutes } from "@/constant/routes";

const NewItemCards = () => {
  const { tags } = useTagsStore();
  const { transactions } = useTransactionStore();

  const lastTransaction = transactions[0];
  const lastTag = tags[0];
  const secondTag = tags[1];

  const Icon = iconList.get(lastTag.icon || "0")?.icon || (() => <></>);
  const IconSecond = iconList.get(secondTag.icon || "0")?.icon || (() => <></>);

  const tableRows = [
    { id: 1, title: "Tag", value: lastTransaction.tag.name },
    {
      id: 2,
      title: "Amount",
      value: `${convertToCurrency(lastTransaction.amount)} $`,
    },
    { id: 3, title: "Date", value: lastTransaction.date },
  ];

  const FallBack = ({ title, href }: { title: string; href: string }) => (
    <Link href={href}>
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
        <Render
          when={!!lastTransaction}
          fallback={
            <FallBack
              title="Create new transaction"
              href={transactionRoutes.addTranslation.href}
            />
          }
        >
          <span className={"flex flex-row gap-2 items-center mb-5"}>
            <TipsAndUpdatesIcon />
            <h4>Last Transaction :</h4>
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
          <Link
            href={transactionRoutes.translationList.href}
            className={
              "bg-neutral text-secondary p-1 text-sm mx-auto mt-3 rounded-lg "
            }
          >
            see more
          </Link>
        </Render>
      </div>
      <div
        className={
          "bg-gradient-to-b from-secondary to-burly_wood rounded-2xl p-3 flex flex-col gap-2"
        }
      >
        <Render
          when={!!lastTag}
          fallback={
            <FallBack title="Create new tag" href={tagRoutes.createTag.href} />
          }
        >
          <span className={"flex flex-row gap-2 items-center mb-5"}>
            <AssistantIcon />
            <h4>new Tags:</h4>
          </span>
          <span
            className={
              "p-2 rounded-full border border-neutral flex flex-row gap-3 items-center justify-center"
            }
          >
            <Icon /> <h4 className={"grow text-start"}>{lastTag.name} </h4>
          </span>
          <span
            className={
              "p-2 rounded-full border border-neutral flex flex-row gap-3 items-center justify-center"
            }
          >
            <IconSecond />
            <h4 className={"grow text-start"}>{secondTag.name} </h4>
          </span>
          <Link
            href={tagRoutes.tagList.href}
            className={
              "bg-neutral text-secondary p-1 text-sm mx-auto rounded-lg"
            }
          >
            see more
          </Link>
        </Render>
      </div>
    </section>
  );
};

export default NewItemCards;
