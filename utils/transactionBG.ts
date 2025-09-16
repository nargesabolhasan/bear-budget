import { TransactionEnum } from "@/types/global";

export const bgHandler = (bg: string) => {
  switch (bg) {
    case TransactionEnum.INCOME:
      return "bg-primary_light";
    case TransactionEnum.EXPENSE:
      return "bg-light_lavender";
    case TransactionEnum.SAVE:
      return "bg-pastel_blue";
    case TransactionEnum.DEBT:
      return "bg-secondary";
    case TransactionEnum.LOANED:
      return "bg-light_mint";
  }
};
