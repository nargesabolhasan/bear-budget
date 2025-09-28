import React from "react";

const PrinterViewTitle = ({ title }: { title: string }) => {
  return (
    <div
      className={
        "hidden print:block print:my-0 w-full text-center border-b border-black mb-4 pb-2"
      }
    >
      {title}
    </div>
  );
};

export default PrinterViewTitle;
