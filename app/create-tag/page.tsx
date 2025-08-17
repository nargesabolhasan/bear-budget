"use client";
import React from "react";
import CreateTagForm from "@/components/create-tag/create-tag-form";
import {
  FormTagEnum,
  TagFormData,
} from "@/components/create-tag/create-tag-form/type";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { useTagsStore } from "@/store/tags";

const CreateTagPage = () => {
  const { createTag } = useTagsStore();

  const submitHandler = (formData: TagFormData) => {
    createTag({ id: uuidv4(), ...formData });
    toast.success(
      <span>
        <strong>{formData[FormTagEnum.NAME]}</strong> generated successfully!!
      </span>
    );
  };

  return (
    <div className={"mx-auto p-3 w-full md:w-1/2"}>
      <CreateTagForm submitHandler={submitHandler} />
    </div>
  );
};

export default CreateTagPage;
