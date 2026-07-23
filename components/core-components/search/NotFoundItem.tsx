import React from "react";
import Image from "next/image";
import i18next from "i18next";

const NotFoundItem = () => {
  return (
    <div
      className={
        "text-brown_secondary flex flex-col items-center gap-3 text-center"
      }
    >
      {i18next.t("global.notFound")}
      <Image
        src="/empty.png"
        alt="error"
        width={150}
        height={300}
        style={{ height: "auto" }}
        priority
        unoptimized
      />
    </div>
  );
};

export default NotFoundItem;
