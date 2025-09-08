import { SvgIconComponent } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import FaceIcon from "@mui/icons-material/Face";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
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

export type TransactionType = {
  id: string;
  amount: string;
  tag: string;
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
