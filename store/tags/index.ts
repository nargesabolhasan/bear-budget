import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { TagStore } from "@/store/tags/type";
import { TagType } from "@/types/global";

export const useTagsStore = create<TagStore>()(
  devtools(
    persist(
      (set, get) => ({
        tags: [],
        createTag: (tag) =>
          set({ tags: [...get().tags, tag] }, false, "createTag"),
        removeTag: (id) =>
          set(
            { tags: get().tags.filter((tag) => tag.id !== id) },
            false,
            "removeTag"
          ),
          editTag: (id,data) =>{
            const updatedList=get().tags.map((tag: TagType) => {
               return tag.id ===id ?{...tag,...data}:tag
            })
              set({tags:updatedList},false,"editTag");
          },
        clear: () => set({ tags: [] }, false, "clear"),
      }),
      { name: "tags" }
    ),
    { name: "TagsStore" }
  )
);
