"use client";

import React from "react";
import { useTagsStore } from "@/store/tags";
import { openDialog } from "@/components/molecules/dialogContainer";
import { tagRoutes } from "@/constant/routes";
import EmptyList from "@/components/molecules/emptyList";
import { Render } from "@/utils/render";
import { useRouter } from "next/navigation";
import TagListDemo from "@/components/tag-list/tagListComponent";
import TagListHeader from "@/components/tag-list/tagListHeader";
import ScrollToBottom from "@/components/molecules/scrollToBottom";

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
  const goToCreateTags = () => {
    router.push(tagRoutes.createTag.href);
  };

  return (
    <div className={"p-4 mx-auto w-full md:w-1/2 flex flex-col gap-3"}>
      <Render
        when={tags.length !== 0}
        fallback={
          <EmptyList onAddItem={() => router.push(tagRoutes.createTag.href)} />
        }
      >
        <TagListHeader
          clearAllTags={clearAllTags}
          handleAddMore={goToCreateTags}
        />
        <TagListDemo />
        <ScrollToBottom />
      </Render>
    </div>
  );
};

export default TagList;
