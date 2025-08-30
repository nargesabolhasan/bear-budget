"use client";

import Image from "next/image";
import { useTransactionStore } from "@/store/transaction";
import { keys } from "@mui/system";
import { convertToCurrency } from "@/utils/utils";

export default function Home() {
  const { groupedByType } = useTransactionStore();
  const grouped = groupedByType();

  return (
    <main>
      <section className={"flex flex-row gap-4 italic"}>
        <h2>hello user</h2>
        <Image src="/favicon.svg" alt="icon" width={42} height={16} />
      </section>
      <section className={"flex flex-col gap-4 italic"}>
        <ul className="flex flex-col gap-4">
          {Object.entries(grouped).map(([key, value], index) => (
            <li key={index}>
              {key}
              {" : "}
              {convertToCurrency(value.totalAmount)} {"=>"}
              {value.transactions.length}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
