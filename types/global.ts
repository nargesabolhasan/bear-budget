import { SvgIconComponent } from "@mui/icons-material";

export enum TransactionEnum {
  INCOME = "Income",
  EXPENSE = "Expense",
  SAVE = "Save",
}

export type IconOption = {
  [key: string]: {
    id: string;
    icon: SvgIconComponent;
  };
};

export type TagType = {
  id: string;
  name: string | undefined;
  transactionType: TransactionEnum;
  icon: string | null;
};
