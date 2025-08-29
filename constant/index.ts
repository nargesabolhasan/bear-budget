import { TransactionEnum } from "@/types/global";

export const TRANSACTION_TYPE_VARIANT = {
  [TransactionEnum.INCOME]: 1,
  [TransactionEnum.EXPENSE]: 0,
  [TransactionEnum.SAVE]: 1,
};
