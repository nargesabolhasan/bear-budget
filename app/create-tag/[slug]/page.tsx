"use client";

import React, { use } from "react";
import CreateTagForm from "@/components/create-tag";
import { useTagsStore } from "@/store/tags";
import { FormTagEnum, TagFormData } from "@/components/create-tag/type";
import { toast } from "sonner";
import { FORMS_WRAPPER_CLASS } from "@/constant/className";
import BackButton from "@/components/molecules/backButton";
import { useRouter } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

const EditTagPage = ({ params }: Props) => {
  const { slug } = use(params);
  const router = useRouter();
  const { tags, editTag } = useTagsStore();
  const defaultValue = tags?.[slug];

  const submitHandler = (formData: TagFormData) => {
    if (!defaultValue) return;

    editTag(defaultValue.id, formData);
    toast.success(
      <span>
        <strong>{formData[FormTagEnum.NAME]}</strong> was updated successfully!
      </span>
    );
    router.back();
  };

  return (
    <div className={FORMS_WRAPPER_CLASS}>
      <CreateTagForm
        submitHandler={submitHandler}
        title={
          <span className={"flex flex-row"}>
            <BackButton />
            <h4 className={"text-center grow"}>Edit Tag</h4>
          </span>
        }
        {...defaultValue}
      />
    </div>
  );
};

export default EditTagPage;
