import { openDialog } from "@/components/molecules/dialogContainer";
import { toast } from "sonner";
import i18n from "i18next";
import { Printer } from "iconsax-react";

export const settingItems = (
  clearAllTransactions: () => void,
  clear: () => void,
  clearBudgets: () => void,
  handlePrint: () => void,
) => {
  return [
    {
      id: 1,
      title: i18n.t("setting.printInfo"),
      onClick: () => {
        handlePrint();
      },
      icon: Printer,
    },
    {
      id: 2,
      title: i18n.t("setting.deleteAllValues", {
        value: i18n.t("global.transactions"),
      }),
      onClick: () => {
        openDialog({
          title: i18n.t("setting.clearAll"),
          hint: i18n.t("setting.hint", {
            value: i18n.t("global.transactions"),
          }),
          confirmHandler: () => {
            clearAllTransactions();
            toast.success(
              i18n.t("setting.successDelete", {
                value: i18n.t("global.transactions"),
              }),
            );
          },
        });
      },
    },
    {
      id: 3,
      title: i18n.t("setting.deleteAllValues", {
        value: i18n.t("global.tags"),
      }),
      onClick: () => {
        openDialog({
          title: i18n.t("setting.clearAll"),
          hint: i18n.t("setting.hint", {
            value: i18n.t("global.tags"),
          }),
          confirmHandler: () => {
            clear();
            toast.success(
              i18n.t("setting.successDelete", {
                value: i18n.t("global.tags"),
              }),
            );
          },
        });
      },
    },
    {
      id: 4,
      title: i18n.t("setting.deleteAllValues", {
        value: i18n.t("global.budgets"),
      }),
      onClick: () => {
        openDialog({
          title: i18n.t("setting.clearAll"),
          hint: i18n.t("setting.hint", {
            value: i18n.t("global.budgets"),
          }),
          confirmHandler: () => {
            clearBudgets();
            toast.success(
              i18n.t("setting.successDelete", {
                value: i18n.t("global.budgets"),
              }),
            );
          },
        });
      },
    },
  ];
};
