import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
//@ts-ignore
import { PaginationProps } from "@mui/material/esm/Pagination/Pagination";

export const ROWS_PER_PAGE = 4;

export default function IPagination({
  showPagination = true,
  ...props
}: PaginationProps & {
  showPagination?: boolean;
}) {
  return (
    <>
      {showPagination && (
        <Stack spacing={2} className={"flex items-center my-5 print:!hidden"}>
          <Pagination
            {...props}
            count={props.count || ROWS_PER_PAGE}
            variant="outlined"
            color="primary"
            dir={"ltr"}
          />
        </Stack>
      )}
    </>
  );
}
