import { SvgIconComponent } from "@mui/icons-material";
import React, { ReactNode } from "react";

export enum TransactionEnum {
  INCOME = "Income",
  EXPENSE = "Expense",
  SAVE = "Save",
  LOANED = "Loaned",
  DEBT = "Debt",
}

export type IconOption = {
  id: string;
  icon: SvgIconComponent;
};

export type IconOptionMap = Map<string, IconOption>;

export type ColorOption = {
  id: number;
  color: string;
};

export type TagType = {
  id: string;
  name: string;
  transactionType: TransactionEnum;
  icon: string;
  color: ColorOption;
};

export type TagInfoTransaction = {
  id: TagType["id"];
  name: string;
  type: string;
};

export type TransactionType = {
  id: string;
  amount: string;
  tag: TagInfoTransaction;
  date: string;
  description?: string;
};

export type NavItemType = {
  label: string;
  key: string;
  href: string;
};

export type DialogDataProps = {
  title: string;
  icon?: SvgIconComponent;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  cancelButtonText?: string;
  confirmButtonText?: string;
  hint?: string | ReactNode;
  cancelHandler?: () => void;
  confirmHandler?: () => void;
};

export type OpenDialogFunc = (data: DialogDataProps) => void;

export type AccordionItemsType = {
  id: string | number;
  panel: string;
  ariaControl: string;
  panelHeaderId: string;
  summary: string | ReactNode;
  detail: string | ReactNode;
  onExpandPanel?: (
    event: React.SyntheticEvent,
    isExpanded: boolean,
    panel: string
  ) => void;
};
