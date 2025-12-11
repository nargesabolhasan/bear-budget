"use client";
import React from "react";
import IButton from "@/components/atoms/button";
import PrintComponent from "@/components/molecules/print";
import CreateTagButton from "@/components/tag-list/CreateTagButton";
import { Trash } from "iconsax-react";

type Props = {
  clearAllTags: () => void;
  handleAddMore: () => void;
  disableDelete?: boolean;
  disablePrint?: boolean;
};

const TagListHeader = ({
  clearAllTags,
  handleAddMore,
  disableDelete = false,
  disablePrint = false,
}: Props) => {
  return (
    <div className={"mt-4 flex flex-row justify-between print:hidden gap-1"}>
      <PrintComponent disablePrint={disableDelete} />
      <CreateTagButton handleAddMore={handleAddMore} />
      <IButton
        size="small"
        variant={"outlined"}
        className={"flex flex-row gap-1 items-center justify-center"}
        onClick={clearAllTags}
        disabled={disableDelete}
      >
        <span>Delete All</span>
        <Trash size="25" color="var(--color-primary)" variant="Bold" />
      </IButton>
    </div>
  );
};

export default TagListHeader;
