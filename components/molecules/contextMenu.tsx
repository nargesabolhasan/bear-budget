"use client";

import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { TransactionEnum } from "@/types/global";
import twMerge from "@/utils/utils";

export type ContextMenuProps = { id: number; title: TransactionEnum }[];

type Props = {
  menuItems: ContextMenuProps;
  children: React.ReactNode;
  onSelectAction?: (item: ContextMenuProps[number]) => void;
  defaultSelect?: number | string;
};

export default function ContextMenu({
  children,
  menuItems,
  onSelectAction,
  defaultSelect = 0,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = React.useState<number | string>(
    defaultSelect
  );

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div id="basic-button" onClick={handleClick}>
        {children}
      </div>
      <Menu
        id="basic-menu"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={`menu-item-${item.id}`}
            onClick={() => {
              handleClose();
              setSelectedId(item.id);
              onSelectAction?.(item);
            }}
            className={twMerge(
              "!text-sm",
              item.id === selectedId && "!bg-primary"
            )}
          >
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
