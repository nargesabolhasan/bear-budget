"use client";

import Image from "next/image";
import IButton from "@/components/atoms/button";
import { color } from "@mui/system";

export default function Home() {
  return (
    <main>
      <section className={"flex flex-row gap-4 italic"}>
        <h2>hello user</h2>
        <Image src="/favicon.svg" alt="icon" width={42} height={16} />
      </section>
      <section className={"flex flex-row gap-4 italic"}>
        <h2>hello user</h2>
        <IButton variant="outlined" size={"medium"} color={"secondary"}>
          Delete
        </IButton>{" "}
        <IButton variant="contained" size={"small"} color={"disabled"}>
          Delete
        </IButton>
        <IButton variant="contained" size={"large"} color={"disabled"}>
          Delete
        </IButton>
        <div className="bg-brand text-black px-4 py-2 rounded-lg hover:bg-primary">
          Click Me
        </div>
      </section>
    </main>
  );
}
