import { SvgIconComponent } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import FaceIcon from "@mui/icons-material/Face";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";

export enum TransactionEnum {
  INCOME = "Income",
  EXPENSE = "Expense",
  SAVE = "Save",
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
