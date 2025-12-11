"use client";

import React from "react";
import { useTagsStore } from "@/store/tags";
import { openDialog } from "@/components/molecules/dialogContainer";
import { tagRoutes } from "@/routes/routes";
import EmptyList from "@/components/molecules/emptyList";
import { Render } from "@/utils/render";
import { useRouter } from "next/navigation";
import TagListDemo from "@/components/tag-list/tagListComponent";
import TagListHeader from "@/components/tag-list/tagListHeader";
import ScrollToBottom from "@/components/molecules/scrollToBottom";
import { toast } from "sonner";
import SearchBar from "@/components/search";
import useSearchTag from "@/hooks/useSearchTag";

const TagList = () => {
  const { tags, clear } = useTagsStore();
  const router = useRouter();

  const clearAllTags = () => {
    openDialog({
      title: "Clear All",
      hint: "Do you want to remove all tags ?",
      confirmHandler: () => {
        clear();
        toast.success(<span>Deleted successfully.</span>);
      },
    });
  };
  const goToCreateTags = () => {
    router.push(tagRoutes.createTag.href);
  };

  return (
    <div
      className={"p-1 md:p-4 mb-20 mx-auto w-full md:w-1/2 flex flex-col gap-3"}
    >
      <Render
        when={Object.values(tags).length !== 0}
        fallback={
          <EmptyList onAddItem={() => router.push(tagRoutes.createTag.href)} />
        }
      >
        <TagListHeader
          disableDelete={Object.values(tags).length === 0}
          disablePrint={Object.values(tags).length === 0}
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
