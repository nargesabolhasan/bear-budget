import React, { Fragment, useState } from "react";
import IButton from "@/components/atoms/button";
import ContextMenu, {
  ContextMenuProps,
} from "@/components/molecules/contextMenu";
import { Render } from "@/utils/render";

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
};

const FilterButtons = ({ navItems, activeId, onChange }: FilterButtonProps) => {
  const [contextButtonTitle, setContextButtonTitle] = useState<string>("");

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
      variant={isActive ? "contained" : "outlined"}
      size={"small"}
    >
      {(showContextMenu && contextButtonTitle) || item.title}
    </IButton>
  );

  const handleSelectItem = (item: ContextMenuProps[number]) => {
    setContextButtonTitle(item.title);
  };

  return (
    <nav className={"flex flex-row gap-3 justify-center my-5"}>
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
