import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
//@ts-ignore
import { PaginationProps } from "@mui/material/esm/Pagination/Pagination";

export default function IPagination({ ...props }: PaginationProps) {
  return (
    <Stack spacing={2} className={"flex items-center my-5"}>
      <Pagination
        {...props}
        count={10}
        variant="outlined"
        color="primary"
        dir={"ltr"}
      />
    </Stack>
  );
}
