import { TransactionEnum } from "@/types/global";

export const groupedStyles = (type: string) => {
  switch (type) {
    case TransactionEnum.INCOME:
      return "bg-primary_light";
    case TransactionEnum.EXPENSE:
      return "bg-fuchsia-200";
    case TransactionEnum.SAVE:
      return "bg-violet-200";
    case TransactionEnum.DEBT:
      return "bg-burly_wood";
    case TransactionEnum.LOANED:
      return "bg-blue-200";
    default:
      return "bg-primary_light";
  }
};
