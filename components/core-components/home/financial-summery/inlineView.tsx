import { SummeryViewProps } from "@/components/core-components/home/financial-summery/blockView";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import i18next from "i18next";
import { twMerge } from "tailwind-merge";

const InlineView = ({ list, onClick }: SummeryViewProps) => {
  return (
    <div
      className={
        "border-placeholder_light2 mx-auto flex w-full flex-col rounded-2xl border border-dashed p-5"
      }
    >
      <MoreHorizTwoToneIcon
        className={"cursor-pointer self-end print:hidden"}
        onClick={onClick}
      />
      <div>
        <h2 className={"mb-4 font-semibold italic"}>
          {i18next.t("home.financialSummary")} :
        </h2>
        <section className="flex flex-col items-start justify-between lg:flex-row lg:items-center lg:space-x-3">
          {list.map((item) => {
            const Icon = item.icon;
            return (
              <span
                key={item.id}
                className={twMerge(
                  "flex w-fit flex-row items-center gap-2 border-b-2 pb-1",
                  item.border,
                )}
              >
                <Icon size="32" color={item.color} /> <h3>{item.title}</h3>
                <span dir={"ltr"}>{item.amount}</span>
              </span>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default InlineView;
