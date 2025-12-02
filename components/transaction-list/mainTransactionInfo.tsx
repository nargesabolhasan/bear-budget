import React, { useState } from "react";
import MainTransactionTitle from "@/components/transaction-list/mainTransactionTitle";
import { TransactionEnum, TransactionType } from "@/types/global";
import ActionButtons from "@/components/transaction-list/actionButtons";
import { twMerge } from "tailwind-merge";
import ICheckbox from "@/components/atoms/checkbox";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import { Controller, useForm } from "react-hook-form";
import { convertToCurrency } from "@/utils/utils";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import IButton from "@/components/atoms/button";
import IDatePicker from "@/components/atoms/datePicker";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import { useTransactionStore } from "@/store/transaction";
import { useFilteredDateContext } from "@/context/filteredDateContext";
import { TagsListType } from "@/store/tags/type";

type Props = {
  transaction: TransactionType;
  showTagIcon: boolean;
  tags: TagsListType;
  showTransactionIndicator?: boolean;
};

const enum ModalFormEnum {
  SETTLED = "isSettled",
  DATE = "date",
}

type FormTypes = {
  [ModalFormEnum.DATE]: string;
  [ModalFormEnum.SETTLED]: boolean;
};

const schema = yup.object({
  [ModalFormEnum.SETTLED]: yup.boolean().oneOf([true], "You must accept this"),
  [ModalFormEnum.DATE]: yup.string().required("Date is required"),
});

const MainTransactionInfo = ({
  transaction,
  showTagIcon,
  tags,
  showTransactionIndicator = false,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const { editTransaction } = useTransactionStore();
  const { date } = useFilteredDateContext();

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (formData: FormTypes) => {
    editTransaction(
      transaction.id,
      {
        amount: "0",
        settled: { ...formData, amount: transaction.amount },
      },
      date.year,
      date.month
    );
    setOpen(false);
  };

  const showSettledButton =
    (tags?.[transaction?.tag]?.transactionType === TransactionEnum.DEBT ||
      tags?.[transaction?.tag]?.transactionType === TransactionEnum.LOANED) &&
    !Boolean(transaction?.settled);

  const showSettledDescription = !!transaction?.settled;

  return (
    <div
      className={twMerge(
        "overflow-x-auto p-3 grow flex flex-col items-end",
        showTransactionIndicator && "border-b border-dashed rounded-br-xl"
      )}
    >
      <MainTransactionTitle
        tag={tags?.[transaction?.tag]}
        amount={transaction.amount}
        amountBeforeSettled={transaction?.settled?.amount}
        date={transaction.date}
        showTagIcon={showTagIcon}
      />
      {showTagIcon && !!transaction?.description && (
        <hr
          className={"opacity-30 my-2 h-0.5 border-0 rounded bg-placeholder"}
        />
      )}
      <p
        className={
          "w-full text-placeholder text-pretty break-words whitespace-normal overflow-wrap break-all"
        }
      >
        {transaction.description}
      </p>
      <div
        className={twMerge(
          "flex flex-row justify-between items-center gap-2 w-full",
          (showSettledButton || showSettledDescription) && "mt-3"
        )}
      >
        {showSettledButton && (
          <span
            className={
              "cursor-pointer text-brown bg-burly_wood border border-brown p-1 rounded-full text-xs"
            }
            onClick={() => setOpen(true)}
          >
            Settled
          </span>
        )}
        {showSettledDescription && (
          <div
            className={"border-4 border-double border-primary p-1 rounded-lg"}
          >
            <p className={"text-olive text-sm"}>
              <BeenhereIcon
                className={"text-primary mr-1"}
                fontSize={"small"}
              />
              Settled on {transaction?.settled?.date}
            </p>
          </div>
        )}
        <div className={"grow flex justify-end"}>
          <ActionButtons transaction={transaction} tags={tags} />
        </div>
      </div>
      {/*----modal for settled-------*/}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "var(--color-neutral_light)",
            borderRadius: 5,
            boxShadow: 15,
            p: 2,
            width: "fit-content",
            height: "fit-content",
          }}
        >
          <form
            //@ts-ignore
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start justify-center w-full px-1 py-3 md:px-3 gap-3"
          >
            <p
              className={
                "text-center text-placeholder text-md border-b border-placeholder pb-2"
              }
            >
              <BeenhereIcon className={"text-primary mr-2"} />
              {convertToCurrency(transaction.amount)} $ has been settled
            </p>
            <Controller
              name={ModalFormEnum.SETTLED}
              control={control}
              render={({ field }) => (
                <ICheckbox
                  id="agree"
                  checked={field.value}
                  onChange={(val) => field.onChange(val)}
                  label={"Settlement"}
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
                    language={"fa"}
                    placeholder={"Date"}
                  />
                </>
              )}
            />
            <div
              className={
                "flex flex-row gap-2 item-center justify-center w-full"
              }
            >
              <IButton type={"submit"} disabled={!isValid}>
                Done
              </IButton>
              <IButton variant={"outlined"} onClick={() => setOpen(false)}>
                Cancel
              </IButton>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default MainTransactionInfo;
