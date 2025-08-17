import { TagType } from "@/types/global";

export interface TagStore {
  tags: TagType[];
  createTag: (tag: TagType) => void;
  removeTag: (id: TagType["id"]) => void;
  editTag: (id: TagType["id"],data:Partial<TagType>) => void;
  clear: () => void;
}
