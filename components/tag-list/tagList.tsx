"use client";

import { TagType } from "@/types/global";
import React from "react";
import { IconButton } from "@mui/material";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import { openDialog } from "@/components/molecules/dialogContainer";
import { tagRoutes } from "@/constant/routes";
import { useTagsStore } from "@/store/tags";
import twMerge from "@/utils/utils";
import { iconList } from "@/constant/icons";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

type Props = { tagList: TagType[] };

const TagListDemo = ({ tagList }: Props) => {
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
      },
    });
  };

  return (
    <ul className={"p-2 flex flex-col gap-1"}>
      {Object.entries(groupedByType()).map(([tagType, tags]) => (
        <div className={"flex flex-col gap-2"}>
          <h2
            className={"font-bold my-2 p-2 text-center bg-olivine rounded-md"}
          >
            {tagType}
          </h2>
          {tags.map((tag) => {
            const Icon = iconList.get(tag.icon || "0")?.icon;

            return (
              <li
                key={`tag-list-${tag.id}`}
                className={
                  "flex justify-between items-center gap-2 p-2 border border-olivine rounded-lg"
                }
              >
                <span className={"grow grid grid-cols-3 items-center"}>
                  <i
                    className={twMerge(
                      "size-[50px] rounded-full flex justify-center items-center",
                      tag.color.color
                    )}
                  >
                    {Icon ? <Icon /> : <></>}
                  </i>
                  <h3 className={"col-span-2"}> {tag.name}</h3>
                </span>
                <span
                  className={"flex flex-row gap-2 justify-between items-center"}
                >
                  <IconButton onClick={() => handleDelete(tag)}>
                    <DeleteRoundedIcon className={"text-olivine"} />
                  </IconButton>

                  <Link href={tagRoutes.editTag(tag.id)}>
                    <BorderColorRoundedIcon
                      fontSize="medium"
                      className={"text-olivine"}
                    />
                  </Link>
                </span>
              </li>
            );
          })}
        </div>
      ))}
    </ul>
  );
};
export default TagListDemo;
