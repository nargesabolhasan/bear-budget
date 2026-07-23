import React from "react";
import Image from "next/image";

const NotFound = () => {
  return (
    <div
      className={
        "bg-neutral_light flex h-full items-center justify-center overflow-y-hidden"
      }
    >
      <div className={"flex flex-col items-center justify-between"}>
        <h4 className={"text-brown_secondary text-[130px]"}>404</h4>
        <Image
          priority
          unoptimized
          src="/404.png"
          alt="404"
          className={"w-full md:w-[300px]"}
          width={200}
          height={300}
          style={{ height: "auto" }}
        />
        <h3 className={"text-brown_secondary text-[50px] font-semibold"}>
          Not Found
        </h3>
      </div>
    </div>
  );
};

export default NotFound;
