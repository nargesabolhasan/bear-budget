import React from "react";

type Props = {
  month: string;
  year: number;
};

const SelectedDateTitle = ({ month, year }: Props) => {
  return (
    <section
      className={
        "border-b-primary mb-3 flex w-full flex-row items-center justify-center gap-1 border-b border-dashed pb-2"
      }
    >
      <h4>
        {month}
        {" - "}
        {year}
      </h4>
    </section>
  );
};

export default SelectedDateTitle;
