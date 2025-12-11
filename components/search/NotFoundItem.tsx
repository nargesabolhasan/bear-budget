import React from "react";
import Image from "next/image";

const NotFoundItem = () => {
  return (
    <div
      className={
        "text-center text-brown_secondary flex flex-col gap-3 items-center"
      }
    >
      not found
      <Image src="/empty.png" alt="error" width={150} height={100} />
    </div>
  );
};

export default NotFoundItem;
