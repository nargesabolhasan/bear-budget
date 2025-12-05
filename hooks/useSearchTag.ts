import { useState, useRef } from "react";
import { GroupedTagsByType } from "@/store/tags/type";
import { TagType, TransactionEnum } from "@/types/global";

const useSearchGroupedTags = ({ groups }: { groups: GroupedTagsByType }) => {
  const [searchResult, setSearchResult] = useState<GroupedTagsByType>(groups);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const onSearch = (query: string) => {
    const q = query.trim().toLowerCase();

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (!q) {
        setSearchResult(groups);
        return;
      }

      const result: GroupedTagsByType = {};

      for (const type in groups) {
        const tags = groups[type as TransactionEnum] || [];

        const filtered = tags.filter((tag: TagType) => {
          return (
            tag.name.toLowerCase().includes(q) ||
            String(tag.transactionType).toLowerCase().includes(q)
          );
        });

        if (filtered.length > 0) {
          result[type as TransactionEnum] = filtered;
        }
      }

      setSearchResult(result);
    }, 300);
  };

  const notFound =
    Object.values(groups).flat().length > 0 &&
    Object.values(searchResult).flat().length === 0;

  return {
    searchResult,
    onSearch,
    notFound,
  };
};

export default useSearchGroupedTags;
