"use client";
import React, { Fragment } from "react";
import IButton from "@/components/atoms/button";
import ContextMenu, {
  ContextMenuProps,
} from "@/components/molecules/contextMenu";
import { Render } from "@/utils/render";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { TransactionEnum } from "@/types/global";
import i18n from "i18next";

export type NavItemsType = {
  id: number;
  title: string;
  showContextMenu?: boolean;
  contextMenu?: ContextMenuProps;
};

type FilterButtonProps = {
  navItems: NavItemsType[];
  activeId: number;
  onChange: (id: number) => void;
  selectedMenuFilter: string;
  setSelectedMenuFilter: React.Dispatch<React.SetStateAction<string>>;
};

const FilterButtons = ({
  navItems,
  activeId,
  onChange,
  selectedMenuFilter,
  setSelectedMenuFilter,
}: FilterButtonProps) => {
  const NavButton = ({
    item,
    index,
    isActive,
    showContextMenu = false,
  }: {
    item: NavItemsType;
    index: number;
    isActive: boolean;
    showContextMenu?: boolean;
  }) => (
    <IButton
      key={`nav-items-${index}-${item.id}`}
      role="tab"
      onClick={() => onChange(item.id)}
      variant={isActive ? "contained" : "text"}
      size={"small"}
      className={"!h-[40px]"}
    >
      {(showContextMenu && i18n.t(`transactions.${selectedMenuFilter}`)) ||
        i18n.t(`transactionList.${item.title}`)}
      {showContextMenu && <ArrowDropDownIcon />}
    </IButton>
  );

  const handleSelectItem = (item: ContextMenuProps[number]) => {
    setSelectedMenuFilter(item.title as TransactionEnum);
  };

  return (
    <nav
      className={
        "text-dark print:hidden border border-primary w-full rounded-full bg-primary_light flex flex-row gap-3 justify-between items-center my-5"
      }
    >
      {navItems.map((item, index) => {
        const isActive = activeId === item.id;
        return (
          <Fragment key={`nav-items-${index}-${item.id}`}>
            <Render
              when={!!item?.showContextMenu}
              fallback={
                <NavButton isActive={isActive} item={item} index={index} />
              }
            >
              <ContextMenu
                menuItems={item?.contextMenu as ContextMenuProps}
                onSelectAction={handleSelectItem}
                defaultSelect={0}
              >
                <NavButton
                  isActive={isActive}
                  item={item}
                  index={index}
                  showContextMenu={item?.showContextMenu}
                />
              </ContextMenu>
            </Render>
          </Fragment>
        );
      })}
    </nav>
  );
};

export default FilterButtons;
