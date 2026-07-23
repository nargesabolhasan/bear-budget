"use client";

import React from "react";
import { useTagsStore } from "@/store/tags";
import { openDialog } from "@/components/molecules/dialogContainer";
import { tagRoutes } from "@/routes/routes";
import EmptyList from "@/components/molecules/emptyList";
import { Render } from "@/utils/render";
import { useRouter } from "next/navigation";
import TagListDemo from "@/components/core-components/tag-list/tagListComponent";
import HelperButtons from "@/components/core-components/tag-list/helperButtons";
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
          </span>,
        );
      },
    });
  };
  const goToCreateTags = () => {
    router.push(tagRoutes.createTag.href);
  };

  return (
    <div
      className={"mx-auto mb-20 flex w-full flex-col gap-3 p-1 md:w-1/2 md:p-4"}
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
