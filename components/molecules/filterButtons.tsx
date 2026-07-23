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
  selectedMenuFilter: string | false;
  setSelectedMenuFilter: React.Dispatch<React.SetStateAction<string | false>>;
};

const FilterButtons = ({
  navItems,
  activeId,
  onChange,
  selectedMenuFilter,
  setSelectedMenuFilter,
}: FilterButtonProps) => {
  const setSelectAutoItem = React.useRef<boolean>(true);

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
      {(showContextMenu &&
        i18n.t(
          selectedMenuFilter
            ? `transactions.${selectedMenuFilter}`
            : `transactionList.${item.title}`,
        )) ||
        i18n.t(`transactionList.${item.title}`)}
      {showContextMenu && <ArrowDropDownIcon />}
    </IButton>
  );

  const handleSelectAutoItem = () => {
    if (setSelectAutoItem.current) {
      setSelectedMenuFilter(TransactionEnum.EXPENSE);
    }
    setSelectAutoItem.current = false;
  };

  const handleSelectItem = (item: ContextMenuProps[number]) => {
    setSelectedMenuFilter(item.title as TransactionEnum);
  };

  return (
    <nav
      className={
        "text-dark border-primary bg-primary_light my-5 flex w-full flex-row items-center justify-between gap-2 rounded-full border sm:gap-3 print:hidden"
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
                translateMode
                onOpen={handleSelectAutoItem}
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
