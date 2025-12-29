import React from "react";
import { useCalenderModeStore } from "@/store/calenderSetup";
import ISwitch from "@/components/atoms/switch";
import { useTranslation } from "react-i18next";

const CalenderSetting: React.FC = () => {
  const { mode, setMode } = useCalenderModeStore();
  const { t } = useTranslation();

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
        setValue={setMode}
      />
    </section>
  );
};

export default CalenderSetting;
