import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { GroupedTagsByType, TagStore } from "@/store/tags/type";

export const useTagsStore = create<TagStore>()(
  devtools(
    persist(
      (set, get) => ({
        tags: {},

        createTag: (tag) =>
          set(
            {
              tags: {
                ...get().tags,
                [tag.id]: tag,
              },
            },
            false,
            "createTag"
          ),

        removeTag: (id) =>
          set(
            () => {
              const current = get().tags;
              const updated = { ...current };
              delete updated[id];
              return { tags: updated };
            },
            false,
            "removeTag"
          ),

        editTag: (id, data) => {
          const currentTag = get().tags[id];
          if (!currentTag) return;

          set(
            {
              tags: {
                ...get().tags,
                [id]: { ...currentTag, ...data },
              },
            },
            false,
            "editTag"
          );
        },

        groupedByType: () => {
          const tags = get().tags;
          const grouped: GroupedTagsByType = {};

          Object.values(tags).forEach((t) => {
            if (!grouped[t.transactionType]) {
              grouped[t.transactionType] = [];
            }
            grouped[t.transactionType]?.push(t);
          });

          return grouped;
        },

        clear: () => set({ tags: {} }, false, "clear"),
      }),
      { name: "tags" }
    ),
    { name: "TagsStore" }
  )
);
