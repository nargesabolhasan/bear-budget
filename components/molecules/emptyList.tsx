import React from "react";
import { IconOption } from "@/types/global";
import IButton from "@/components/atoms/button";
import Image from "next/image";
import i18next from "i18next";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";

type Props = {
  title?: string;
  hint?: string;
  IconComponent?: IconOption["icon"];
  onAddItem?: () => void;
};

const EmptyList = ({
  title = i18next.t("global.addNewItems"),
  hint = i18next.t("global.emptyHint"),
  IconComponent = AddCircleTwoToneIcon,
  onAddItem,
}: Props) => {
  return (
    <section
      className={
        "mt-[80px] flex flex-col items-center justify-center gap-4 print:mt-0"
      }
    >
      <IButton
        color={"secondary"}
        className={"!text-brown"}
        onClick={() => {
          onAddItem?.();
        }}
      >
        {IconComponent && <IconComponent />}
        <span>{title}</span>
      </IButton>
      <h3 className={"text-brown_secondary text-center select-none"}>{hint}</h3>
      <Image
        src="/add.png"
        alt="icon"
        width={150}
        height={150}
        priority
        unoptimized
      />
    </section>
  );
};

export default EmptyList;
