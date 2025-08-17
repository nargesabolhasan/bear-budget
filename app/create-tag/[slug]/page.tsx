"use client";

import React, { use } from "react";
import CreateTagForm from "@/components/create-tag/create-tag-form";
import { useTagsStore } from "@/store/tags";
import {
  FormTagEnum,
  TagFormData,
} from "@/components/create-tag/create-tag-form/type";
import { toast } from "sonner";

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
    <div className={"mx-auto p-3 w-full md:w-1/2"}>
      <CreateTagForm submitHandler={submitHandler} {...defaultValue} />
    </div>
  );
};

export default EditTagPage;
