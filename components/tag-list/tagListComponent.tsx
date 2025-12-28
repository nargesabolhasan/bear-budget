"use client";

import { TagType } from "@/types/global";
import React from "react";
import { IconButton } from "@mui/material";
import Link from "next/link";
import { openDialog } from "@/components/molecules/dialogContainer";
import { tagRoutes } from "@/routes/routes";
import { useTagsStore } from "@/store/tags";
import { twMerge } from "tailwind-merge";
import { iconList } from "@/constant/icons";
import { toast } from "sonner";
import PrinterViewTitle from "@/components/printer-demo/printerViewTitle";
import { Edit2, Trash } from "iconsax-react";
import SearchBar from "@/components/search";
import useSearchTag from "@/hooks/useSearchTag";
import { Render } from "@/utils/render";
import NotFoundItem from "@/components/search/NotFoundItem";
import i18next from "i18next";

const TagListDemo = () => {
  const { removeTag, groupedByType } = useTagsStore();

  const { onSearch, searchResult, notFound } = useSearchTag({
    groups: groupedByType(),
  });

  const handleDelete = (tag: TagType) => {
    openDialog({
      title: i18next.t("dialog.remove", { value: i18next.t("global.tag") }),
      hint: (
        <span>
          {i18next.t("dialog.hint")} <strong>{tag.name}</strong>{" "}
          {i18next.t("global.QM")}
        </span>
      ),
      confirmHandler: () => {
        removeTag(tag.id);
        toast.success(
          <span>
            {i18next.t("setting.successDelete", {
              value: i18next.t("global.tag"),
            })}
          </span>
        );
      },
    });
  };

  return (
    <>
      <PrinterViewTitle title={i18next.t("global.tags")} />
      {Object.entries(groupedByType()) && <SearchBar onSearch={onSearch} />}
      <Render when={!notFound} fallback={<NotFoundItem />}>
        <ul
          className={
            "print-list flex flex-col gap-1 print:grid print:grid-cols-5"
          }
        >
          {Object.entries(searchResult).map(([tagType, tags], index) => (
            <div className={"flex flex-col gap-2"} key={`${tagType}-${index}`}>
              <h2
                style={{ fontFamily: "PlaywriteNZGuides" }}
                className={
                  "text-dark mx-auto w-full md:w-1/2 font-bold my-2 p-2 text-center bg-primary_light rounded-full"
                }
              >
                {i18next.t(`transactions.${tagType}`)}
              </h2>
              {Object.values(tags).map((tag) => {
                const Icon =
                  iconList.get(tag.icon || "0")?.icon || (() => <span></span>);

                return (
                  <li key={`tag-list-${tag.id}`}>
                    <div
                      className={
                        "list-item-block force-block flex justify-between items-center gap-1 p-2 border border-primary rounded-full print:rounded-2xl"
                      }
                    >
                      <span
                        className={"grow grid grid-cols-3 items-center gap-2"}
                      >
                        <Icon className={"!hidden print:!block"} />
                        <i
                          className={twMerge(
                            "print:hidden size-[50px] rounded-full flex justify-center items-center border border-placeholder_light",
                            tag.color.color
                          )}
                        >
                          {<Icon />}
                        </i>
                        <h3 className={"col-span-2"}> {tag.name}</h3>
                      </span>
                      <span
                        className={
                          "flex flex-row gap-3 justify-between items-center print:hidden"
                        }
                      >
                        <IconButton onClick={() => handleDelete(tag)}>
                          <Trash
                            size="30"
                            color={"var(--color-primary)"}
                            variant="Bulk"
                          />
                        </IconButton>

                        <Link href={tagRoutes.editTag(tag.id)}>
                          <Edit2
                            size="30"
                            color={"var(--color-hover_primary)"}
                            variant="Bulk"
                          />
                        </Link>
                      </span>
                    </div>
                  </li>
                );
              })}
            </div>
          ))}
        </ul>
      </Render>
    </>
  );
};
export default TagListDemo;
