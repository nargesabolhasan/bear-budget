import IButton from "@/components/atoms/button";
import ICheckbox from "@/components/atoms/checkbox";
import IDatePicker from "@/components/atoms/datePicker";
import ActionButtons from "@/components/core-components/transaction-list/actionButtons";
import MainTransactionTitle from "@/components/core-components/transaction-list/mainTransactionTitle";
import IModal from "@/components/molecules/modal";
import useCalendarUtils from "@/hooks/useCalendarUtils";
import i18n from "@/i18n/config";
import { TagsListType } from "@/store/tags/type";
import { useTransactionStore } from "@/store/transaction";
import { TransactionEnum, TransactionType } from "@/types/global";
import { convertToCurrency } from "@/utils/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import i18next from "i18next";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import * as yup from "yup";

type Props = {
  transaction: TransactionType;
  showTagIcon: boolean;
  tags: TagsListType;
  showTransactionIndicator?: boolean;
  showTagIconColor?: boolean;
};

const enum ModalFormEnum {
  SETTLED = "isSettled",
  DATE = "date",
}

type FormTypes = {
  [ModalFormEnum.DATE]: string;
  [ModalFormEnum.SETTLED]: boolean;
};

const schema: yup.ObjectSchema<FormTypes> = yup.object({
  [ModalFormEnum.SETTLED]: yup
    .boolean()
    .required()
    .oneOf([true], i18next.t("transactionList.mustAccept")),

  [ModalFormEnum.DATE]: yup.string().required(
    i18next.t("global.required", {
      value: i18next.t("addTransaction.date"),
    }),
  ),
});

const MainTransactionInfo = ({
  transaction,
  showTagIcon,
  tags,
  showTransactionIndicator = false,
  showTagIconColor = false,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const { editTransaction } = useTransactionStore();
  const { formatDate } = useCalendarUtils();

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (formData: FormTypes) => {
    editTransaction(transaction.id, {
      amount: "0",
      settled: {
        ...formData,
        amount: transaction.amount,
      },
    });

    setOpen(false);
  };
  const showSettledButton =
    (tags?.[transaction?.tag]?.transactionType === TransactionEnum.DEBT ||
      tags?.[transaction?.tag]?.transactionType === TransactionEnum.CREDIT) &&
    !Boolean(transaction?.settled);

  const showSettledDescription = !!transaction?.settled;

  return (
    <div
      className={twMerge(
        "flex grow flex-col items-end overflow-x-auto p-3",
        showTransactionIndicator &&
          "border-placeholder_light2 rounded-br-xl border-b border-dashed",
      )}
    >
      <MainTransactionTitle
        tag={tags?.[transaction?.tag]}
        amount={transaction.amount}
        amountBeforeSettled={transaction?.settled?.amount}
        date={transaction.date}
        showTagIcon={showTagIcon}
        showTagIconColor={showTagIconColor}
        isSystemtransaction={!!transaction?.systemKey}
      />
      {showTagIcon && !!transaction?.description && (
        <hr
          className={"bg-placeholder my-2 h-0.5 rounded border-0 opacity-30"}
        />
      )}
      <p
        dir="auto"
        style={{ unicodeBidi: "plaintext" }}
        className="text-placeholder overflow-wrap mt-2 w-full text-start text-pretty break-words break-all whitespace-normal"
      >
        {transaction.systemKey
          ? i18n.t(`transactions.system.${transaction.systemKey}`)
          : transaction.description}
      </p>
      <div
        className={twMerge(
          "flex w-full flex-row items-center justify-between gap-2",
          (showSettledButton || showSettledDescription) && "mt-3",
        )}
      >
        {showSettledButton && (
          <span
            className={
              "text-brown bg-burly_wood border-brown cursor-pointer rounded-full border p-1 text-xs"
            }
            onClick={() => setOpen(true)}
          >
            {i18next.t("transactionList.settled")}
          </span>
        )}
        {showSettledDescription && (
          <div
            className={"border-primary rounded-lg border-4 border-double p-1"}
          >
            <p className={"text-olive text-sm"}>
              <BeenhereIcon
                className={"text-primary mr-1"}
                fontSize={"small"}
              />
              {i18next.t("transactionList.settledOn")}
              {formatDate(transaction?.settled?.date as string)}
            </p>
          </div>
        )}
        <div className={"flex grow justify-end"}>
          <ActionButtons transaction={transaction} tags={tags} />
        </div>
      </div>
      {/*----modal for settled-------*/}
      <IModal open={open} onClose={() => setOpen(false)}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col items-start justify-center gap-3 px-1 py-3 md:px-3"
        >
          <p
            className={
              "text-placeholder text-md border-placeholder border-b pb-2 text-center"
            }
          >
            <BeenhereIcon className={"text-primary mr-2"} />
            {convertToCurrency(transaction.amount)} ${" "}
            {i18next.t("transactionList.settledHint")}
          </p>
          <Controller
            name={ModalFormEnum.SETTLED}
            control={control}
            render={({ field }) => (
              <ICheckbox
                id="agree"
                checked={field.value}
                onChange={(val) => field.onChange(val)}
                label={i18next.t("transactionList.settlement")}
              />
            )}
          />
          <Controller
            control={control}
            name={ModalFormEnum.DATE}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <>
                <IDatePicker
                  value={value || ""}
                  onChange={(date) => {
                    onChange(date);
                  }}
                  placeholder={i18next.t("addTransaction.date")}
                />
              </>
            )}
          />
          <div
            className={"item-center flex w-full flex-row justify-center gap-2"}
          >
            <IButton type={"submit"} disabled={!isValid}>
              {i18next.t("dialog.confirm")}
            </IButton>
            <IButton variant={"outlined"} onClick={() => setOpen(false)}>
              {i18next.t("dialog.cancel")}
            </IButton>
          </div>
        </form>
      </IModal>
    </div>
  );
};

export default MainTransactionInfo;
