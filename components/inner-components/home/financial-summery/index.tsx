"use client";

import { useTransactionStore } from "@/store/transaction";
import { convertToCurrency } from "@/utils/utils";
import { ShoppingCart, Star, TicketStar, WalletMoney } from "iconsax-react";
import useCalendarUtils from "@/hooks/useCalendarUtils";
import i18next from "i18next";
import BlockView from "@/components/inner-components/home/financial-summery/blockView";
import InlineView from "@/components/inner-components/home/financial-summery/inlineView";

const FinancialSummery = ({
  inlineView,
  year = new Date().getFullYear(),
  month = new Date().getMonth(),
}: {
  inlineView?: boolean;
  year?: number;
  month?: number;
}) => {
  const { groupedByType } = useTransactionStore();
  const { getCurrentMonthNumber, isJalali } = useCalendarUtils();

  const data =
    groupedByType(year, month, isJalali, getCurrentMonthNumber()) || {};

  const income = data?.Income?.totalAmount ?? 0;
  const totalOutgoing = data?.Expense?.totalAmount ?? 0;

  const save = data?.Save?.totalAmount ?? 0;

  const remaining = income - totalOutgoing;

  const list = [
    {
      id: 1,
      title: i18next.t("home.incomes"),
      amount: convertToCurrency(income),
      icon: WalletMoney,
      color: "var(--color-primary)",
      border: "border-primary",
    },
    {
      id: 2,
      title: i18next.t("home.outgoing"),
      amount: convertToCurrency(totalOutgoing),
      icon: ShoppingCart,
      color: "var(--color-pink)",
      border: "border-pink",
    },
    {
      id: 3,
      title: i18next.t("home.savings"),
      amount: convertToCurrency(save),
      icon: TicketStar,
      color: "var(--color-purple)",
      border: "border-purple",
    },
    {
      id: 4,
      title: i18next.t("home.remaining"),
      amount: convertToCurrency(remaining),
      icon: Star,
      color: "var(--color-pastel_blue)",
      border: "border-pastel_blue",
    },
  ];

  return (
    <>{inlineView ? <InlineView list={list} /> : <BlockView list={list} />}</>
  );
};

export default FinancialSummery;
