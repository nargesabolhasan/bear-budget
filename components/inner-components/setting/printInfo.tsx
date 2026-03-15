"use client";
import FinancialSummery from "@/components/inner-components/home/financial-summery";
import React, { use } from "react";
import TransactionItems from "@/components/inner-components/transaction-list/TransactionItems";
import { useTagsStore } from "@/store/tags";
import { useTransactionStore } from "@/store/transaction";
import useCalendarUtils from "@/hooks/useCalendarUtils";
import BudgetInfoList from "@/components/inner-components/setting/budgetInfoList";
import { settingRoute } from "@/routes/routes";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type Props = {
  params: Promise<{ slug: string }>;
};

const PrintInfo = ({ params }: Props) => {
  const { tags } = useTagsStore();
  const { transactions } = useTransactionStore();
  const { getCurrentMonthNumber, getCurrentYear } = useCalendarUtils();
  const { t } = useTranslation();
  const { slug: param } = use(params);

  return (
    <div
      className={
        "flex flex-col gap-2 items-center justify-center md:w-2/3 mx-auto"
      }
    >
      <nav
        className={
          "bg-primary_light w-full text-dark rounded-xl grid grid-cols-3 items-center justify-center gap-3"
        }
      >
        <Link href={settingRoute.href}>
          <IconButton className={"!text-[20px] !text-dark"}>
            <ArrowBackIcon />
          </IconButton>
        </Link>
        <span className={"text-center"}>{t("setting.printDemo")}</span>
      </nav>
      <FinancialSummery inlineView />
      {t("global.budgets")}:
      <BudgetInfoList />
      {t("global.transactions")}:
      <TransactionItems
        tags={tags}
        transactionList={
          transactions?.[getCurrentYear()]?.[getCurrentMonthNumber()]
        }
        showTransactionHeader={false}
        showTransactionIndicator
      />
    </div>
  );
};
export default PrintInfo;
