import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TagStore } from "@/store/tags/type";
import { TagType } from "@/types/global";
export const useTagsStore = create<TagStore>()(
  persist(
    (set, get) => ({
      tags: [],
      createTag: (tag: TagType) => set({ tags: [...get().tags, tag] }),
      removeTag: (id: string) =>
        set({ tags: get().tags.filter((tag) => tag.id !== id) }),
      clear: () => set({ tags: [] }),
    }),
    {
      name: "tags",
    }
  )
);
