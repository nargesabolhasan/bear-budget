import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
//@ts-ignore
import { PaginationProps } from "@mui/material/esm/Pagination/Pagination";

export const ROWS_PER_PAGE = 10;
export const PAGE_COUNT = 10;

export default function IPagination({ ...props }: PaginationProps) {
  return (
    <Stack spacing={2} className={"flex items-center my-5 print:!hidden"}>
      <Pagination
        {...props}
        count={props.count || PAGE_COUNT}
        variant="outlined"
        color="primary"
        dir={"ltr"}
      />
    </Stack>
  );
}
