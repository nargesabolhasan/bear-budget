import React from "react";
import Image from "next/image";
const NotFound = () => {
  return (
    <div
      className={
        "bg-neutral_dark h-full flex items-center justify-center overflow-y-hidden"
      }
    >
      <Image
        src="/404.png"
        alt="404"
        className={"w-full md:w-[500px]"}
        width={400}
        height={400}
      />
    </div>
  );
};

export default NotFound;
