import React from "react";
import FormatListBulletedAddIcon from "@mui/icons-material/FormatListBulletedAdd";
import { IconOption } from "@/types/global";

type Props = {
  title?: string;
  hint?: string;
  IconComponent?: IconOption["icon"];
  onAddItem?: () => void;
};

const EmptyList = ({
  title = "Add items",
  hint = "this list is empty try to add new item!",
  IconComponent = FormatListBulletedAddIcon,
  onAddItem,
}: Props) => {
  return (
    <section className={"mt-[80px]"}>
      <div
        className={"cursor-pointer text-xl flex flex-row justify-center"}
        onClick={() => {
          onAddItem?.();
        }}
      >
        {IconComponent && <i className={"size-10"}>{<IconComponent />}</i>}
        <h3>{title}</h3>
      </div>
      <p className={"select-none text-center"}>{hint}</p>
    </section>
  );
};

export default EmptyList;
