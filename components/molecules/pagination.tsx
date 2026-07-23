import * as React from "react";
import Pagination, { PaginationProps } from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export const ROWS_PER_PAGE = 4;

type Props = PaginationProps & {
  showPagination?: boolean;
};

export default function IPagination({
  showPagination = true,
  ...props
}: Props) {
  if (!showPagination) {
    return null;
  }

  return (
    <Stack spacing={2} className="my-5 flex items-center print:!hidden">
      <Pagination
        {...props}
        count={props.count ?? ROWS_PER_PAGE}
        variant="outlined"
        color="primary"
        dir="ltr"
      />
    </Stack>
  );
}
