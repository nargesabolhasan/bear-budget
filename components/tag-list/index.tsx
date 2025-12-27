"use client";

import React from "react";
import { useTagsStore } from "@/store/tags";
import { openDialog } from "@/components/molecules/dialogContainer";
import { tagRoutes } from "@/routes/routes";
import EmptyList from "@/components/molecules/emptyList";
import { Render } from "@/utils/render";
import { useRouter } from "next/navigation";
import TagListDemo from "@/components/tag-list/tagListComponent";
import HelperButtons from "@/components/tag-list/helperButtons";
import ScrollToBottom from "@/components/molecules/scrollToBottom";
import { toast } from "sonner";
import i18next from "i18next";

const TagList = () => {
  const { tags, clear } = useTagsStore();
  const router = useRouter();

  const clearAllTags = () => {
    openDialog({
      title: i18next.t("setting.clearAll"),
      hint: i18next.t("setting.hint", { value: i18next.t("global.tags") }),
      confirmHandler: () => {
        clear();
        toast.success(
          <span>
            {i18next.t("setting.successDelete", {
              value: i18next.t("global.tags"),
            })}
          </span>
        );
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
        <HelperButtons
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
