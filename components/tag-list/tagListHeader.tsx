"use client";
import React from "react";
import IButton from "@/components/atoms/button";
import PrintComponent from "@/components/molecules/print";
import CreateTagButton from "@/components/tag-list/CreateTagButton";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

type Props = {
  clearAllTags: () => void;
  handleAddMore: () => void;
};

const TagListHeader = ({ clearAllTags, handleAddMore }: Props) => {
  return (
    <div className={"mt-4 flex flex-row justify-between print:hidden"}>
      <PrintComponent />
      <CreateTagButton handleAddMore={handleAddMore} />
      <IButton
        size="small"
        variant={"outlined"}
        className={"flex flex-row gap-1"}
        onClick={clearAllTags}
      >
        <span>Delete All</span>
        <DeleteTwoToneIcon color="primary" />
      </IButton>
    </div>
  );
};

export default TagListHeader;
