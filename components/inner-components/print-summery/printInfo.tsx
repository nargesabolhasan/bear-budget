"use client";
import FinancialSummery from "@/components/inner-components/home/financial-summery";
import React from "react";
import TransactionItems from "@/components/inner-components/transaction-list/TransactionItems";
import { useTagsStore } from "@/store/tags";
import { useTransactionStore } from "@/store/transaction";
import useCalendarUtils from "@/hooks/useCalendarUtils";
import BudgetInfoList from "@/components/inner-components/print-summery/budgetInfoList";
import { settingRoute } from "@/routes/routes";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PrinterFilterSetting, {
  FormDataFiltering,
} from "@/components/inner-components/print-summery/printerFilterSetting";
import { useForm } from "react-hook-form";
import { EnumPrinterInputs } from "@/components/inner-components/print-summery/type";

export type PrintInfoProps = {
  selectedDate: {
    year: number;
    month: number;
    isoYear: number;
    isoMonth: number;
  };
};

const PrintInfo = ({ selectedDate }: PrintInfoProps) => {
  const { control, watch } = useForm<FormDataFiltering>({});
  const { tags } = useTagsStore();
  const { getTransactions } = useTransactionStore();
  const { t } = useTranslation();
  const { calenderMonthList, isJalali } = useCalendarUtils();

  return (
    <div
      className={
        "flex flex-col gap-2 items-center justify-center md:w-2/3 mx-auto my-3 transaction transition-opacity delay-100 duration-200"
      }
    >
      <nav
        className={
          "w-full grid grid-cols-6 items-start justify-start gap-3 font-semibold text-lg"
        }
        dir={"ltr"}
      >
        <Link href={settingRoute.href} className={"text-start"}>
          <ArrowBackIcon className="print:hidden" />
        </Link>
        <span className={"text-center col-span-4"}>
          {t("setting.printDemo")}: {calenderMonthList[selectedDate.month - 1]}{" "}
          {selectedDate.year}
        </span>
      </nav>
      <PrinterFilterSetting control={control} />
      {watch(EnumPrinterInputs.SUMMERY) && (
        <FinancialSummery
          inlineView
          year={selectedDate.isoYear}
          month={selectedDate.isoMonth}
          notIsoMonth={selectedDate.month}
        />
      )}
      {watch(EnumPrinterInputs.BUDGET) && (
        <>
          {t("global.budgets")}:
          <BudgetInfoList selectedDate={selectedDate} />
        </>
      )}
      {watch(EnumPrinterInputs.TRANSACTION) && (
        <>
          {t("global.transactions")}:
          <TransactionItems
            tags={tags}
            transactionList={getTransactions(
              selectedDate.isoYear,
              selectedDate.isoMonth,
              isJalali,
              selectedDate.month,
            )}
            showTransactionHeader={false}
            showTransactionIndicator
          />
        </>
      )}
    </div>
  );
};
export default PrintInfo;
