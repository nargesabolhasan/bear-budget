import React from "react";

type Props = {
  month: string;
  year: number;
};

const SelectedDateTitle = ({ month, year }: Props) => {
  return (
    <section
      className={
        "w-full flex flex-row items-center justify-center gap-1 border-b border-dashed border-b-primary pb-2 mb-3"
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
