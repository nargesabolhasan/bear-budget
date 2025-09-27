import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { GroupedTagsByType, TagStore } from "@/store/tags/type";
import { TagType, TransactionEnum } from "@/types/global";

export const useTagsStore = create<TagStore>()(
  devtools(
    persist(
      (set, get) => ({
        tags: [],
        createTag: (tag) =>
          set({ tags: [tag, ...get().tags] }, false, "createTag"),
        removeTag: (id) =>
          set(
            { tags: get().tags.filter((tag) => tag.id !== id) },
            false,
            "removeTag"
          ),
        editTag: (id, data) => {
          const updatedList = get().tags.map((tag: TagType) => {
            return tag.id === id ? { ...tag, ...data } : tag;
          });
          set({ tags: updatedList }, false, "editTag");
        },
        groupedByType: () => {
          const tags = get().tags;
          const groupedTransactions: GroupedTagsByType = {};

          tags.map((t) => {
            if (!groupedTransactions[t.transactionType]) {
              groupedTransactions[t.transactionType] = [];
            }
            groupedTransactions[t.transactionType]?.push(t);
          });

          return groupedTransactions;
        },
        clear: () => set({ tags: [] }, false, "clear"),
      }),
      { name: "tags" }
    ),
    { name: "TagsStore" }
  )
);
