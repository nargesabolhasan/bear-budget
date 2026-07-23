import React from "react";
import Image from "next/image";

const Loading = () => {
  return (
    <div className={"mt-20 flex h-full flex-col items-center justify-center"}>
      <Image
        priority
        unoptimized
        src="/loading.png"
        alt="loading"
        className={"w-[150px]"}
        width={100}
        height={100}
      />
      <div className={"flex flex-row items-center justify-center"}>
        <div className="loader border-olive bg-primary_light text-brown flex aspect-square w-10 animate-bounce items-center justify-center rounded-full border-r-2 text-xl">
          $
        </div>
        {/*----text---------*/}

        <div className="text-brown_secondary p-2.5 text-2xl">
          <div>
            <span className="mr-2">Loading</span>
            <span className="animate-[ping_1.5s_0.5s_ease-in-out_infinite]">
              .
            </span>
            <span className="animate-[ping_1.5s_0.7s_ease-in-out_infinite]">
              .
            </span>
            <span className="animate-[ping_1.5s_0.9s_ease-in-out_infinite]">
              .
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
