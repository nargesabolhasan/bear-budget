import { TagType, TransactionEnum } from "@/types/global";
import { Record } from "iconsax-react";

export type GroupedTagsByType = Partial<Record<TransactionEnum, TagType[]>>;

export type TagsListType = Record<string, TagType>;

export interface TagStore {
  tags: TagsListType;
  createTag: (tag: TagType) => void;
  removeTag: (id: TagType["id"]) => void;
  editTag: (id: TagType["id"], data: Partial<TagType>) => void;
  clear: () => void;

  groupedByType: () => GroupedTagsByType;
}
