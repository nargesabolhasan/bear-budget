import { TransactionEnum } from "@/types/global";

export const groupedStyles = (type: string, style: string = "bg") => {
  switch (type) {
    case TransactionEnum.INCOME:
      return style + "-primary";
    case TransactionEnum.EXPENSE:
      return style + "-secondary";
    case TransactionEnum.SAVE:
      return style + "-pastel_blue";
    case TransactionEnum.DEBT:
      return style + "-burly-wood";
    case TransactionEnum.LOANED:
      return style + "-warning";
  }
};
