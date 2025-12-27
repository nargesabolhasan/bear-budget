import React from "react";
import { Control, Controller } from "react-hook-form";
import { FormTransactionEnum } from "@/components/add-transaction/type";
import TagPicker from "@/components/add-transaction/tagPicker";
import { Render } from "@/utils/render";
import Link from "next/link";
import { tagRoutes } from "@/routes/routes";
import IAccordion from "@/components/molecules/accordion";
import { TagsListType } from "@/store/tags/type";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import i18next from "i18next";

type Props = {
  control: Control<any, any, any>;
  tags: TagsListType;
  tagsCount: number;
};

const TagAccordion = ({ control, tags, tagsCount }: Props) => {
  const accordionItem = [
    {
      id: 1,
      panel: "tag-picker",
      panelHeaderId: "tag-picker-header",
      ariaControl: "tag-picker-aria",
      summary: (
        <div className={"h-full w-full flex flex-col gap-3"}>
          <h4 className={"text-placeholder"}>
            {i18next.t("addTransaction.selectTag")}
          </h4>
          <Controller
            name={FormTransactionEnum.TAG}
            control={control}
            render={({ field }) => (
              <TagPicker
                value={field.value}
                onChange={field.onChange}
                tagList={Object.values(tags).slice(0, tagsCount)}
              />
            )}
          />
        </div>
      ),
      detail: (
        <Render
          when={Object.keys(tags).length > 0}
          fallback={
            <Link href={tagRoutes.createTag.href}>
              {i18next.t("addTransaction.emptyTagList")}
            </Link>
          }
        >
          <div className={"mr-5"}>
            {Object.values(tags).slice(tagsCount).length !== 0 && (
              <Controller
                name={FormTransactionEnum.TAG}
                control={control}
                render={({ field }) => (
                  <TagPicker
                    value={field.value}
                    onChange={field.onChange}
                    tagList={Object.values(tags).slice(tagsCount)}
                  />
                )}
              />
            )}
            <Link
              href={tagRoutes.createTag.href}
              className={
                "text-xs md:text-sm cursor-pointer flex flex-row items-center justify-center gap-1 mt-4 text-placeholder"
              }
            >
              <AddCircleTwoToneIcon
                className={"text-primary"}
                fontSize={"small"}
              />
              {i18next.t("global.add")}
            </Link>
          </div>
        </Render>
      ),
    },
  ];

  return (
    <IAccordion
      items={accordionItem}
      detailClassName={"py-3! pr-5!"}
      showExpandIcon={Object.values(tags).slice(tagsCount).length !== 0}
      className={"p-4 border border-placeholder_light"}
    />
  );
};

export default TagAccordion;
