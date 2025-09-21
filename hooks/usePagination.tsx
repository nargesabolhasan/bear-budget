"use client";
import { useState, useMemo } from "react";

export default function usePaginationData<T>(list: T[], rowsPerPage: number) {
  const [page, setPage] = useState(1);

  const paginated = useMemo(() => {
    if (Array.isArray(list)) {
      return list?.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    }
    return [];
  }, [list, page, rowsPerPage]);

  const pageCount = Math.ceil(list?.length || 0 / rowsPerPage);

  return { paginated, page, setPage, pageCount };
}
