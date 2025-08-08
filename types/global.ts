import { SvgIconComponent } from "@mui/icons-material";

export const enum TransactionEnum {
  Income,
  Expense,
  Installment,
}

export type IconOption = {
  [key: string]: {
    id: string;
    icon: SvgIconComponent;
  };
};

export type TagType = {
  id: string;
  name: string;
  transactionType: TransactionEnum;
  icon: IconOption[string];
};
