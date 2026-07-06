import React from "react";
import { useCalenderModeStore } from "@/store/calenderSetup";
import ISwitch from "@/components/atoms/switch";
import { useTranslation } from "react-i18next";
import { CalendarModeUnion } from "@/store/calenderSetup/type";
import { openDialog } from "@/components/molecules/dialogContainer";
import i18next from "i18next";

const ToggleCalendarMode: React.FC = () => {
  const { mode, setMode } = useCalenderModeStore();
  const { t } = useTranslation();

  const handleToggle = (activeMode: CalendarModeUnion) => {
    setMode(activeMode);
    openDialog({
      title: t("setting.notice"),
      hint: t("setting.toggleCalendarHint"),
      confirmButtonText: t("setting.toggleCalendarConfirm"),
      showCancelButton: false,
    });
  };

  return (
    <section className="flex flex-col gap-2 items-center w-full">
      <p>{t("setting.calender")} </p>
      <ISwitch
        color={"primary"}
        value={mode}
        rightValue={"jalali"}
        leftValue={"gregorian"}
        leftTitle={t("setting.gregorian")}
        rightTitle={t("setting.jalali")}
        onChange={handleToggle}
      />
    </section>
  );
};

export default ToggleCalendarMode;
