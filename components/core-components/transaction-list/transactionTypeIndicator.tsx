import { TagType } from "@/types/global";
import i18next from "i18next";
import TagIcon from "../create-tag/tagIcon";

const TransactionTypeIndicator = ({ tag }: { tag: TagType }) => {
  return (
    <div className={"flex w-[45] flex-col items-center justify-center gap-2"}>
      <TagIcon tag={tag} />
      <span
        className={"text-olive text-center text-xs"}
        style={{
          fontFamily:
            i18next.language === "en-US"
              ? "PlaywriteNZGuides"
              : "playpenSansArabic",
        }}
      >
        {i18next.t(`transactions.${tag?.transactionType}`)}
      </span>
    </div>
  );
};

export default TransactionTypeIndicator;
