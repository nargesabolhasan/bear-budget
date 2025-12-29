import React from "react";
import Image from "next/image";
import i18next from "i18next";

const NotFoundItem = () => {
  return (
    <div
      className={
        "text-center text-brown_secondary flex flex-col gap-3 items-center"
      }
    >
      {i18next.t("global.notFound")}
      <Image
        src="/empty.png"
        alt="error"
        width={150}
        height={300}
        style={{ height: "auto" }}
      />
    </div>
  );
};

export default NotFoundItem;
