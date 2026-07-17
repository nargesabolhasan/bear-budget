import { SummeryViewProps } from "@/components/core-components/home/financial-summery/blockView";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import i18next from "i18next";
import { twMerge } from "tailwind-merge";

const InlineView = ({ list, onClick }: SummeryViewProps) => {
  return (
    <div
      className={
        "flex flex-col border border-placeholder_light2 border-dashed w-full p-5 rounded-2xl mx-auto"
      }
    >
      <MoreHorizTwoToneIcon
        className={"self-end cursor-pointer print:hidden"}
        onClick={onClick}
      />
      <div>
        <h2 className={"italic font-semibold mb-4"}>
          {i18next.t("home.financialSummary")} :
        </h2>
        <section className="flex flex-col items-start justify-between lg:space-x-3 lg:flex-row lg:items-center ">
          {list.map((item) => {
            const Icon = item.icon;
            return (
              <span
                key={item.id}
                className={twMerge(
                  "flex flex-row items-center gap-2 border-b-2 w-fit pb-1",
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
