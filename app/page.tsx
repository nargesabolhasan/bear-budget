"use client";

import Image from "next/image";
import IButton from "@/components/atoms/button";

export default function Home() {
  return (
    <main>
      <section className={"flex flex-row gap-4 italic"}>
        <h2>hello user</h2>
        <Image src="/favicon.svg" alt="icon" width={42} height={16} />
      </section>
      <section className={"flex flex-row gap-4 italic"}>
        <h2>hello user</h2>
      </section>
    </main>
  );
}
