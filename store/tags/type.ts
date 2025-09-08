import { TagType, TransactionEnum } from "@/types/global";

export type GroupedTagsByType = Partial<Record<TransactionEnum, TagType[]>>;
export interface TagStore {
  tags: TagType[];
  createTag: (tag: TagType) => void;
  removeTag: (id: TagType["id"]) => void;
  editTag: (id: TagType["id"], data: Partial<TagType>) => void;
  clear: () => void;
  groupedByType: () => GroupedTagsByType;
}
