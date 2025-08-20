"use client";
import React from "react";
import CreateTagForm from "@/components/create-tag";
import { FormTagEnum, TagFormData } from "@/components/create-tag/type";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { useTagsStore } from "@/store/tags";
import { FORMS_WRAPPER_CLASS } from "@/constant";

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
    <div className={FORMS_WRAPPER_CLASS}>
      <CreateTagForm submitHandler={submitHandler} />
    </div>
  );
};

export default CreateTagPage;
