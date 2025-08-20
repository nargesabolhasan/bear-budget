"use client";

import React from "react";
import Link from "next/link";
import { useTagsStore } from "@/store/tags";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { openDialog } from "@/components/molecules/dialogContainer";
import { TagType } from "@/types/global";
import TagDemo from "@/components/create-tag/tagDemo";
import { tagRoutes } from "@/constant/routes";

const TagList = () => {
  const { tags, removeTag, clear } = useTagsStore();

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

  const clearAllTags = () => {
    openDialog({
      title: "Clear All",
      hint: "Do you want to remove all tags ?",
      confirmHandler: () => clear(),
    });
  };

  return (
    <div
      className={
        "mx-auto w-full md:w-1/2 grid grid-cols-2 md:grid-cols-4 flex-wrap gap-4"
      }
    >
      {tags.map((item) => (
        <div
          className={
            "bg-gray-100 flex flex-col gap-4 w-full rounded-md justify-start items-center"
          }
          key={item.id}
        >
          <span className={"flex flex-row gap-3"}>
            <IconButton onClick={() => handleDelete(item)}>
              <DeleteIcon />
            </IconButton>

            <Link href={tagRoutes.editTag(item.id)}>
              <EditIcon />
            </Link>
          </span>
          <TagDemo
            name={item.name}
            transactionType={item.transactionType}
            icon={item.icon}
            color={item.color}
          />
        </div>
      ))}
      <IconButton onClick={clearAllTags}>
        delete all transactions
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default TagList;
