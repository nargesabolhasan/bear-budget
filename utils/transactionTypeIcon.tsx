import { TransactionEnum } from "@/types/global";
import AddCardTwoToneIcon from "@mui/icons-material/AddCardTwoTone";
import SavingsTwoToneIcon from "@mui/icons-material/SavingsTwoTone";
import { MoneyRecive, MoneySend, ShoppingCart } from "iconsax-react";

export const transactionTypeIcon = (type: TransactionEnum | string) => {
  switch (type) {
    case TransactionEnum.INCOME:
      return (
        <AddCardTwoToneIcon className={"text-primary"} fontSize={"large"} />
      );
    case TransactionEnum.EXPENSE:
      return (
        <ShoppingCart size="38" color="var(--color-pink)" variant="Bulk" />
      );
    case TransactionEnum.SAVE:
      return (
        <SavingsTwoToneIcon className={"text-purple"} fontSize={"large"} />
      );
    case TransactionEnum.DEBT:
      return <MoneyRecive size="32" color="var(--color-secondary)" />;

    case TransactionEnum.LOANED:
      return <MoneySend size="32" color="var(--color-info)" />;
  }
};
