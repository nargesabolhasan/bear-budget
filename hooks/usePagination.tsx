"use client";
import { useMemo, useState } from "react";
import { ROWS_PER_PAGE } from "@/components/molecules/pagination";

export default function usePaginationData<T>(
  list: T[] = [],
  rowsPerPage: number = ROWS_PER_PAGE
) {
  const [page, setPage] = useState(1);

  const pageCount = useMemo(() => {
    if (!list.length) return 1;
    return Math.ceil(list.length / rowsPerPage);
  }, [list.length, rowsPerPage]);

  const showPagination = list.length > rowsPerPage;

  const paginated = useMemo(() => {
    if (!showPagination) return list;

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return list.slice(start, end);
  }, [list, page, rowsPerPage, showPagination]);

  const safeSetPage = (p: number) => {
    const next = Math.max(1, Math.min(p, pageCount));
    setPage(next);
  };

  return {
    paginated,
    page,
    setPage: safeSetPage,
    pageCount,
    showPagination,
  };
}
