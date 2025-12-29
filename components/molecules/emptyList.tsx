import React from "react";
import FormatListBulletedAddIcon from "@mui/icons-material/FormatListBulletedAdd";
import { IconOption } from "@/types/global";
import IButton from "@/components/atoms/button";
import Image from "next/image";
import i18next from "i18next";

type Props = {
  title?: string;
  hint?: string;
  IconComponent?: IconOption["icon"];
  onAddItem?: () => void;
};

const EmptyList = ({
  title = i18next.t("global.addNewItems"),
  hint = i18next.t("global.emptyHint"),
  IconComponent = FormatListBulletedAddIcon,
  onAddItem,
}: Props) => {
  return (
    <section
      className={
        "mt-[80px] print:mt-0 flex flex-col items-center justify-center gap-4"
      }
    >
      <IButton
        color={"secondary"}
        className={"!text-brown"}
        size={"large"}
        onClick={() => {
          onAddItem?.();
        }}
      >
        {IconComponent && <i className={"size-10"}>{<IconComponent />}</i>}
        <span>{title}</span>
      </IButton>
      <h3 className={"select-none text-center text-brown_secondary"}>{hint}</h3>
      <Image
        src="/add.png"
        alt="icon"
        width={200}
        height={200}
        priority
        unoptimized
      />
    </section>
  );
};

export default EmptyList;
