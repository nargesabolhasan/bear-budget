"use client";

import { TagType } from "@/types/global";
import React from "react";
import { IconButton } from "@mui/material";
import Link from "next/link";
import { openDialog } from "@/components/molecules/dialogContainer";
import { tagRoutes } from "@/constant/routes";
import { useTagsStore } from "@/store/tags";
import { twMerge } from "tailwind-merge";
import { iconList } from "@/constant/icons";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { toast } from "sonner";
import PrinterViewTitle from "@/components/printer-demo/printerViewTitle";

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
      <ul className={"flex flex-col gap-1 print:grid print:grid-cols-5"}>
        {Object.entries(groupedByType()).map(([tagType, tags], index) => (
          <div className={"flex flex-col gap-2"} key={`${tagType}-${index}`}>
            <h2
              className={
                "mx-auto w-1/2 font-bold my-2 p-2 text-center bg-primary rounded-full"
              }
            >
              {tagType}
            </h2>
            {tags.map((tag) => {
              const Icon =
                iconList.get(tag.icon || "0")?.icon || (() => <span></span>);

              return (
                <li
                  key={`tag-list-${tag.id}`}
                  className={
                    "list-item-content flex justify-between items-center gap-2 p-2 border border-primary rounded-lg"
                  }
                >
                  <span className={"grow grid grid-cols-3 items-center gap-2"}>
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
                      <DeleteRoundedIcon className={"text-primary"} />
                    </IconButton>

                    <Link href={tagRoutes.editTag(tag.id)}>
                      <BorderColorRoundedIcon
                        fontSize="medium"
                        className={"text-primary"}
                      />
                    </Link>
                  </span>
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
