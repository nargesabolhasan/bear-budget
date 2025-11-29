import { openDialog } from "@/components/molecules/dialogContainer";
import { toast } from "sonner";

export const settingItems = (
  clearAllTransactions: () => void,
  clear: () => void,
  clearBudgets: () => void
) => {
  return [
    {
      id: 1,
      title: "Delete All Transactions",
      onClick: () => {
        openDialog({
          title: "Clear All",
          hint: "Clear All of transaction!",
          confirmHandler: () => {
            clearAllTransactions();
            toast.success("Deleted transactions successfully.");
          },
        });
      },
    },
    {
      id: 2,
      title: "Delete All Tags",
      onClick: () => {
        openDialog({
          title: "Clear All",
          hint: "Clear All of Tags!",
          confirmHandler: () => {
            clear();
            toast.success("Deleted tags successfully.");
          },
        });
      },
    },
    {
      id: 3,
      title: "Delete All Budgets",
      onClick: () => {
        openDialog({
          title: "Clear All",
          hint: "Clear All of budgets!",
          confirmHandler: () => {
            clearBudgets();
            toast.success("Deleted budgets successfully.");
          },
        });
      },
    },
  ];
};
