import React from "react";
import Image from "next/image";

const Loading = () => {
  return (
    <div className={"flex flex-col items-center justify-center h-full"}>
      <Image
        src="/loading.png"
        alt="loading"
        className={"w-[150px]"}
        width={100}
        height={100}
      />
      <div className={"flex flex-row items-center justify-center"}>
        <div className="loader border-r-2 rounded-full text-xl border-olive bg-primary_light animate-bounce aspect-square w-10 flex justify-center items-center text-brown">
          $
        </div>
        {/*----text---------*/}

        <div className="p-2.5 text-2xl text-brown">
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
