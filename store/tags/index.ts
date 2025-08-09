import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { TagStore } from "@/store/tags/type";
import { TagType } from "@/types/global";

export const useTagsStore = create<TagStore>()(
  devtools(
    persist(
      (set, get) => ({
        tags: [],
        createTag: (tag: TagType) =>
          set({ tags: [...get().tags, tag] }, false, "createTag"),
        removeTag: (id: string) =>
          set(
            { tags: get().tags.filter((tag) => tag.id !== id) },
            false,
            "removeTag"
          ),
        clear: () => set({ tags: [] }, false, "clear"),
      }),
      { name: "tags" }
    ),
    { name: "TagsStore" }
  )
);
