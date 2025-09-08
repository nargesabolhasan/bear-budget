"use client";
import React from "react";
import IButton from "@/components/atoms/button";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";

const CreateTagButton = ({ handleAddMore }: { handleAddMore: () => void }) => {
  return (
    <IButton
      size="small"
      variant={"outlined"}
      className={"flex flex-row gap-2"}
      onClick={handleAddMore}
    >
      <span>Create</span>
      <AddCircleTwoToneIcon color={"primary"} />
    </IButton>
  );
};

export default CreateTagButton;
