import { TransactionEnum } from "@/types/global";
import AddCardTwoToneIcon from "@mui/icons-material/AddCardTwoTone";
import SavingsTwoToneIcon from "@mui/icons-material/SavingsTwoTone";
import ShoppingCartCheckoutTwoToneIcon from "@mui/icons-material/ShoppingCartCheckoutTwoTone";
import ProductionQuantityLimitsTwoToneIcon from "@mui/icons-material/ProductionQuantityLimitsTwoTone";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";

export const transactionTypeIcon = (type: TransactionEnum | string) => {
  switch (type) {
    case TransactionEnum.INCOME:
      return <AddCardTwoToneIcon />;
    case TransactionEnum.EXPENSE:
      return <ShoppingCartTwoToneIcon />;
    case TransactionEnum.SAVE:
      return <SavingsTwoToneIcon />;
    case TransactionEnum.DEBT:
      return <ProductionQuantityLimitsTwoToneIcon />;
    case TransactionEnum.LOANED:
      return <ShoppingCartCheckoutTwoToneIcon />;
  }
};
