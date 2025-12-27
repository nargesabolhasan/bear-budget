"use client";

import { useTransactionStore } from "@/store/transaction";
import { convertToCurrency } from "@/utils/utils";
import { ShoppingCart, Star, TicketStar, WalletMoney } from "iconsax-react";
import { twMerge } from "tailwind-merge";
import { getCurrentMonthNumber, getCurrentYear } from "@/utils/dateList";
import i18next from "i18next";

const Summery = () => {
  const { groupedByType } = useTransactionStore();
  const data =
    groupedByType(getCurrentYear("fa"), getCurrentMonthNumber("fa")) || {};

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
    <div
      className={
        "border border-dashed border-r-0 w-fit p-4 rounded-2xl mt-3 mx-auto"
      }
    >
      <h2 className={"italic font-semibold mb-4"}>Financial Summary :</h2>
      <ul className="space-y-3">
        {list.map((item) => {
          const Icon = item.icon;
          return (
            <li
              key={item.id}
              className={twMerge(
                "flex flex-row items-center gap-2 border-b-2 w-fit pb-1",
                item.border
              )}
            >
              <Icon size="32" color={item.color} /> <h3>{item.title}</h3>
              <span>{item.amount}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Summery;
