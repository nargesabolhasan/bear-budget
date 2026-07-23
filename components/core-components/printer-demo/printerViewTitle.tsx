import React from "react";

const PrinterViewTitle = ({ title }: { title: string }) => {
  return (
    <div
      className={
        "mb-4 hidden w-full border-b border-black pb-2 text-center print:my-0 print:block"
      }
    >
      {title}
    </div>
  );
};

export default PrinterViewTitle;
