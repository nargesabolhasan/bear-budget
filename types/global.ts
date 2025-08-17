import { SvgIconComponent } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import FaceIcon from "@mui/icons-material/Face";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {ReactNode} from "react";

export enum TransactionEnum {
  INCOME = "Income",
  EXPENSE = "Expense",
  SAVE = "Save",
  LOANED="Loaned",
  DEBT="Debt"
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
  hint?: string|ReactNode;
  cancelHandler?: () => void;
  confirmHandler?: () => void;
};

export type OpenDialogFunc = (data: DialogDataProps) => void;
