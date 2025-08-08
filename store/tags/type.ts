import { TagType } from "@/types/global";

export interface TagStore {
  tags: TagType[];
  createTag: (tag: TagType) => void;
  removeTag: (id: string) => void;
  clear: () => void;
}
