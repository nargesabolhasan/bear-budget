"use client";
import { useState, useMemo } from "react";
import { ROWS_PER_PAGE } from "@/components/molecules/pagination";

export default function usePaginationData<T>(
  list: T[],
  rowsPerPage: number = ROWS_PER_PAGE
) {
  const [page, setPage] = useState(1);

  const paginated = useMemo(() => {
    if (Array.isArray(list) && list.length > 0) {
      return list?.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    }
    return [];
  }, [list, page, rowsPerPage]);

  const pageCount = Math.ceil((list?.length || 0) / rowsPerPage);

  return { paginated, page, setPage, pageCount };
}
