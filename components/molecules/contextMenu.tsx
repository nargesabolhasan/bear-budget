"use client";

import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { TransactionEnum } from "@/types/global";
import { twMerge } from "tailwind-merge";
import i18next from "i18next";

export type ContextMenuProps = {
  id: number;
  title: TransactionEnum | string | React.ReactNode;
  onClick?: () => void;
}[];

type Props = {
  menuItems: ContextMenuProps;
  children: React.ReactNode;
  onSelectAction?: (item: ContextMenuProps[number]) => void;
  defaultSelect?: number | string;
  className?: string;
  resetAfterSelect?: boolean;
  translateMode?: boolean;
};

export default function ContextMenu({
  children,
  menuItems,
  onSelectAction,
  defaultSelect = 0,
  resetAfterSelect = false,
  translateMode = false,
  className,
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
    <div className={"print:hidden"}>
      <div
        id="basic-button"
        onClick={handleClick}
        className={twMerge("w-fit", className)}
      >
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
          paper: {
            sx: {
              borderRadius: "20px",
            },
          },
        }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={`menu-item-${item.id}`}
            onClick={() => {
              handleClose();
              if (!resetAfterSelect) {
                setSelectedId(item.id);
              }
              onSelectAction?.(item);
              item?.onClick?.();
            }}
            className={twMerge(
              "!text-sm",
              item.id === selectedId && "!bg-primary"
            )}
          >
            {translateMode ? (
              <>{i18next.t(`transactions.${item.title}`)}</>
            ) : (
              <>{item.title}</>
            )}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
