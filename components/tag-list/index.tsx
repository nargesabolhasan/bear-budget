"use client";

import React from "react";
import { useTagsStore } from "@/store/tags";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { openDialog } from "@/components/molecules/dialogContainer";
import { tagRoutes } from "@/constant/routes";
import EmptyList from "@/components/molecules/emptyList";
import { Render } from "@/utils/render";
import { useRouter } from "next/navigation";
import TagListDemo from "@/components/tag-list/tagList";

const TagList = () => {
  const { tags, clear } = useTagsStore();
  const router = useRouter();

  const clearAllTags = () => {
    openDialog({
      title: "Clear All",
      hint: "Do you want to remove all tags ?",
      confirmHandler: () => clear(),
    });
  };

  return (
    <div className={"mx-auto w-full md:w-1/2 flex flex-col gap-3"}>
      <Render
        when={tags.length !== 0}
        fallback={
          <EmptyList onAddItem={() => router.push(tagRoutes.createTag.href)} />
        }
      >
        <TagListDemo tagList={tags} />

        <IconButton onClick={clearAllTags}>
          delete all tags
          <DeleteIcon />
        </IconButton>
      </Render>
    </div>
  );
};

export default TagList;
