import React from "react";
import { Control, Controller } from "react-hook-form";
import { FormTransactionEnum } from "@/components/add-transaction/type";
import TagPicker from "@/components/add-transaction/tagPicker";
import { Render } from "@/utils/render";
import Link from "next/link";
import { tagRoutes } from "@/routes/routes";
import IAccordion from "@/components/molecules/accordion";
import { TagType } from "@/types/global";
import { TagsListType } from "@/store/tags/type";

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
          <h4 className={"text-placeholder"}>select tag</h4>
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
              you have to create a new tag! click to create new one.
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
