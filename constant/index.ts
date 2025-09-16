import { TransactionEnum } from "@/types/global";
import { ContextMenuProps } from "@/components/molecules/contextMenu";

export const TRANSACTION_TYPE_VARIANT = {
  [TransactionEnum.INCOME]: 1,
  [TransactionEnum.EXPENSE]: 0,
  [TransactionEnum.SAVE]: 1,
};

export const filterTransactionList: () => ContextMenuProps = () => {
  return Object.values(TransactionEnum).map((item, index) => {
    return { title: item, id: index };
  });
};
