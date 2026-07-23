import { useMemo, useRef, useState } from "react";
import { TransactionEnum } from "@/types/global";
import { GroupedTagsByType } from "@/store/tags/type";
import i18n from "i18next";

type UseSearchTagProps = {
  groups: GroupedTagsByType;
};

type UseSearchTagReturn = {
  onSearch: (query: string) => void;
  searchResult: GroupedTagsByType;
  notFound: boolean;
};

const SYSTEM_TAGS = ["previousMonth"];

const useSearchTag = ({ groups }: UseSearchTagProps): UseSearchTagReturn => {
  const [searchQuery, setSearchQuery] = useState("");

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const onSearch = (query: string) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      setSearchQuery(query);
    }, 300);
  };

  const searchResult = useMemo(() => {
    if (!searchQuery.trim()) {
      return groups;
    }

    const query = searchQuery.toLowerCase();

    const result: GroupedTagsByType = {};

    Object.entries(groups).forEach(([type, tags]) => {
      if (!tags) {
        return;
      }

      const filtered = tags.filter((tag) => {
        const tagName = SYSTEM_TAGS.includes(tag.name)
          ? i18n.t(`transactions.system.${tag.name}`)
          : tag.name;

        return (
          tagName.toLowerCase().includes(query) ||
          i18n
            .t(`transactions.${tag.transactionType}`)
            .toLowerCase()
            .includes(query)
        );
      });

      if (filtered.length) {
        result[type as TransactionEnum] = filtered;
      }
    });

    return result;
  }, [groups, searchQuery]);

  const notFound = useMemo(() => {
    return Object.keys(searchResult).length === 0;
  }, [searchResult]);

  return {
    onSearch,
    searchResult,
    notFound,
  };
};

export default useSearchTag;
