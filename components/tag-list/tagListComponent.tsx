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

const TagListDemo = () => {
  const { removeTag, groupedByType } = useTagsStore();

  const handleDelete = (tag: TagType) => {
    openDialog({
      title: "Remove tag",

      hint: (
        <span>
          Remove <strong>{tag.name}</strong> forever!
        </span>
      ),
      confirmHandler: () => {
        removeTag(tag.id);
        toast.success(<span>Deleted successfully.</span>);
      },
    });
  };

  return (
    <>
      <PrinterViewTitle title={"All Tags:"} />
      <ul
        className={
          "print-list flex flex-col gap-1 print:grid print:grid-cols-5"
        }
      >
        {Object.entries(groupedByType()).map(([tagType, tags], index) => (
          <div className={"flex flex-col gap-2"} key={`${tagType}-${index}`}>
            <h2
              style={{ fontFamily: "PlaywriteNZGuides" }}
              className={
                "mx-auto w-full md:w-1/2 font-bold my-2 p-2 text-center bg-primary_light rounded-full"
              }
            >
              {tagType}
            </h2>
            {tags.map((tag) => {
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
                          "print:hidden size-[50px] rounded-full flex justify-center items-center",
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
    </>
  );
};
export default TagListDemo;
