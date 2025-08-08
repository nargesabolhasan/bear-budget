import React from "react";
import { TextField } from "@mui/material";
import IconPicker from "@/components/create-tag/create-tag-form/iconPicker";
import { iconList } from "@/constant/icons";

const CreateTagForm = () => {
  const handleSelectIcon = () => {
    //useTagsStore
  };
  return (
    <form className={"flex flex-col gap-4 w-full"}>
      <TextField label="Tag Name" />
      <TextField label="Icon" />
      <IconPicker icons={Object.values(iconList)} onSelect={handleSelectIcon} />
      <TextField label="Type" />
    </form>
  );
};

export default CreateTagForm;
