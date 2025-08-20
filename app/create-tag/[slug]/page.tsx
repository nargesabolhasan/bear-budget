"use client";

import React, { use } from "react";
import CreateTagForm from "@/components/create-tag";
import { useTagsStore } from "@/store/tags";
import { FormTagEnum, TagFormData } from "@/components/create-tag/type";
import { toast } from "sonner";
import { FORMS_WRAPPER_CLASS } from "@/constant";

type Props = {
  params: Promise<{ slug: string }>;
};

const EditTagPage = ({ params }: Props) => {
  const { slug } = use(params);

  const { tags, editTag } = useTagsStore();
  const defaultValue = tags.find((item) => item.id === slug);

  const submitHandler = (formData: TagFormData) => {
    if (!defaultValue) return;

    editTag(defaultValue.id, formData);
    toast.success(
      <span>
        <strong>{formData[FormTagEnum.NAME]}</strong> was updated successfully!
      </span>
    );
  };

  return (
    <div className={FORMS_WRAPPER_CLASS}>
      <CreateTagForm submitHandler={submitHandler} {...defaultValue} />
    </div>
  );
};

export default EditTagPage;
