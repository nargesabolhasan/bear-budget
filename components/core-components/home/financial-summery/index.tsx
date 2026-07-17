"use client";

import BlockView from "@/components/core-components/home/financial-summery/blockView";
import InlineView from "@/components/core-components/home/financial-summery/inlineView";
import IModal from "@/components/molecules/modal";
import useCalendarUtils from "@/hooks/useCalendarUtils";
import { useFinancialSummary } from "@/hooks/useFinancialSummary";
import { useTransactionStore } from "@/store/transaction";
import { GroupedTransactionType } from "@/store/transaction/type";
import { convertToCurrency } from "@/utils/utils";
import i18next from "i18next";
import { ShoppingCart, Star, TicketStar, WalletMoney } from "iconsax-react";
import { useState } from "react";
import PreferenceCheckboxes from "../preferenceCheckboxes";

const FinancialSummery = ({
  inlineView,
  year = new Date().getFullYear(),
  month = new Date().getMonth() + 1,
  notIsoMonth,
}: {
  inlineView?: boolean;
  year?: number;
  month?: number;
  notIsoMonth?: number;
}) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { groupedByType } = useTransactionStore();
  const { getCurrentMonthNumber, isJalali } = useCalendarUtils();

  const targetedMonth =
    notIsoMonth || (isJalali ? getCurrentMonthNumber() : month);

  const data: GroupedTransactionType =
    groupedByType(year, month, isJalali, targetedMonth) || {};

  const { income, outgoing, save, remaining } = useFinancialSummary(data);

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
      amount: convertToCurrency(outgoing),
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

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleClose = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      {inlineView ? (
        <InlineView list={list} onClick={handleOpenModal} />
      ) : (
        <BlockView list={list} onClick={handleOpenModal} />
      )}
      <IModal open={isOpenModal} onClose={handleClose} showCloseButton>
        <PreferenceCheckboxes />
      </IModal>
    </>
  );
};

export default FinancialSummery;
