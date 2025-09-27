import { TransactionEnum } from "@/types/global";

export const groupedStyles = (type: string, style: string = "bg") => {
  switch (type) {
    case TransactionEnum.INCOME:
      return style + "-primary_light";
    case TransactionEnum.EXPENSE:
      return style + "-fuchsia-200";
    case TransactionEnum.SAVE:
      return style + "-violet-200";
    case TransactionEnum.DEBT:
      return style + "-secondary";
    case TransactionEnum.LOANED:
      return style + "-orange-100";
    default:
      return style + "-primary_light";
  }
};
