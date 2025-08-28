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
  title = "empty list",
  hint = "this list is empty try to add new item!",
  IconComponent = FormatListBulletedAddIcon,
  onAddItem,
}: Props) => {
  return (
    <section>
      <div>
        {IconComponent && (
          <i
            className={"size-10"}
            onClick={() => {
              onAddItem?.();
            }}
          >
            {<IconComponent />}
          </i>
        )}
        <h3>{title}</h3>
        <p>{hint}</p>
      </div>
    </section>
  );
};

export default EmptyList;
