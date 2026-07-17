"use client";
import React, { use } from "react";
import PrintInfo from "@/components/core-components/print-summery/printInfo";

type Props = {
  params: Promise<{ slug: string }>;
};

const Page = ({ params }: Props) => {
  const { slug } = use(params);
  const date = slug.split(".");
  const selectedDate = {
    isoMonth: parseInt(date[0]),
    isoYear: parseInt(date[1]),
    month: parseInt(date[2]),
    year: parseInt(date[3]),
  };
  return (
    <div>
      <PrintInfo selectedDate={selectedDate} />
    </div>
  );
};

export default Page;
