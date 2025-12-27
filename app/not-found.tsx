import React from "react";
import Image from "next/image";

const NotFound = () => {
  return (
    <div
      className={
        "bg-neutral_light h-full flex items-center justify-center overflow-y-hidden"
      }
    >
      <div className={"flex flex-col items-center justify-between"}>
        <h4 className={"text-[130px] text-brown_secondary"}>404</h4>
        <Image
          src="/404.png"
          alt="404"
          className={"w-full md:w-[300px]"}
          width={200}
          height={300}
          style={{ height: "auto" }}
          priority
        />
        <h3 className={"font-semibold text-[50px] text-brown_secondary"}>
          Not Found
        </h3>
      </div>
    </div>
  );
};

export default NotFound;
