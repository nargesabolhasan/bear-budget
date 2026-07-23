"use client";
import IButton from "@/components/atoms/button";
import ICheckbox from "@/components/atoms/checkbox";
import IModal from "@/components/molecules/modal";
import { TransactionEnum } from "@/types/global";
import { convertToCurrency } from "@/utils/utils";

import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";

type Props = {
  open: boolean;

  balance: number;

  onSubmit: (
    value: TransactionEnum.INCOME | TransactionEnum.SAVE | "skip",
  ) => void;
};

export default function PreviousBalanceModal({
  open,
  balance,
  onSubmit,
}: Props) {
  const [value, setValue] = useState<
    TransactionEnum.INCOME | TransactionEnum.SAVE | "skip" | null
  >(null);

  const { t } = useTranslation();

  const select = (v: any) => {
    setValue(v);
  };

  const submit = () => {
    if (!value) return;

    onSubmit(value);
  };

  return (
    <IModal open={open} onClose={() => {}} showCloseButton={false}>
      <form className="flex w-[250px] flex-col gap-5">
        <h3 className="text-primary text-center text-lg font-semibold">
          {t("home.balanceModal.title")}
        </h3>
        <h4 className="text-placeholder border-b border-dashed pb-2 text-center text-sm leading-7 font-medium md:text-base">
          <Trans
            i18nKey="home.balanceModal.description"
            values={{
              amount: convertToCurrency(balance),
            }}
          />
        </h4>
        <ICheckbox
          checked={value === TransactionEnum.INCOME}
          onChange={() => select(TransactionEnum.INCOME)}
          label={t("home.balanceModal.income")}
        />

        <ICheckbox
          checked={value === TransactionEnum.SAVE}
          onChange={() => select(TransactionEnum.SAVE)}
          label={t("home.balanceModal.saving")}
        />

        <ICheckbox
          checked={value === "skip"}
          onChange={() => select("skip")}
          label={t("home.balanceModal.skip")}
        />

        <IButton onClick={submit} className="btn-primary !text-dark w-full">
          {t("dialog.confirm")}
        </IButton>
      </form>
    </IModal>
  );
}
