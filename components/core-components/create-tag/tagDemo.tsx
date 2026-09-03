import { TagFormData } from "@/components/core-components/create-tag/type";
import { SYSTEM_TAG } from "@/constant/global";
import i18n from "@/i18n/config";
import { TransactionEnum } from "@/types/global";
import i18next from "i18next";
import { twMerge } from "tailwind-merge";
import TagIcon from "./tagIcon";

const TagDemo = ({
  demoTitle,
  icon,
  name,
  color,
  transactionType,
  className,
  onClick,
}: TagFormData & {
  demoTitle?: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className={twMerge(
        "border-placeholder mx-auto flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed p-4",
        className && className,
      )}
      dir={"auto"}
      onClick={() => {
        onClick?.();
      }}
    >
      <div className={"flex w-full flex-col items-start gap-2"}>
        {demoTitle && <h3 className={"w-full text-center"}>{demoTitle}</h3>}
      </div>
      {!!name && (
        <span
          className={
            "text-md text-dark_surface overflow-wrap block text-pretty wrap-break-word break-all whitespace-normal"
          }
        >
          {name === SYSTEM_TAG
            ? i18n.t(`transactions.system.previousMonth`)
            : name}
        </span>
      )}
      <TagIcon
        tag={{
          id: "string",
          name: "string",
          transactionType: TransactionEnum["INCOME"],
          icon: icon,
          color,
        }}
        size="size-12.5"
      />
      <h4 className={"text-placeholder mx-auto"}>
        {i18next.t(`transactions.${transactionType}`)}
      </h4>
    </div>
  );
};

export default TagDemo;
