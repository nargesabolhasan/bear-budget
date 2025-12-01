import { TransactionEnum } from "@/types/global";
import { ContextMenuProps } from "@/components/molecules/contextMenu";

export const filterTransactionList: () => ContextMenuProps = () => {
  return Object.values(TransactionEnum).map((item, index) => {
    return { title: item, id: index };
  });
};
