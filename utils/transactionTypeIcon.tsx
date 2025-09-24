import { TransactionEnum } from "@/types/global";
import AddCardTwoToneIcon from "@mui/icons-material/AddCardTwoTone";
import SavingsTwoToneIcon from "@mui/icons-material/SavingsTwoTone";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import VolunteerActivismTwoToneIcon from "@mui/icons-material/VolunteerActivismTwoTone";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";

export const transactionTypeIcon = (type: TransactionEnum | string) => {
  switch (type) {
    case TransactionEnum.INCOME:
      return <AddCardTwoToneIcon />;
    case TransactionEnum.EXPENSE:
      return <ShoppingCartTwoToneIcon />;
    case TransactionEnum.SAVE:
      return <SavingsTwoToneIcon />;
    case TransactionEnum.DEBT:
      return <MoneyOffIcon />;
    case TransactionEnum.LOANED:
      return <VolunteerActivismTwoToneIcon />;
  }
};
