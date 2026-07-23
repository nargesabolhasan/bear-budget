import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import i18next from "i18next";
import { Icon } from "iconsax-react";
import { twMerge } from "tailwind-merge";

export type SummeryViewProps = {
  list: {
    id: number;
    title: string;
    amount: string;
    icon: Icon;
    color: string;
    border: string;
  }[];
  onClick: () => void;
};

const BlockView = ({ list, onClick }: SummeryViewProps) => {
  return (
    <div
      className={
        "border-placeholder_light2 mx-auto mt-3 flex w-fit flex-col rounded-2xl border border-r-0 border-dashed p-4"
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
        <ul className="space-y-3">
          {list.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.id}
                className={twMerge(
                  "flex w-fit flex-row items-center gap-2 border-b-2 pb-1",
                  item.border,
                )}
              >
                <Icon size="32" color={item.color} /> <h3>{item.title}</h3>
                <span dir={"ltr"}>{item.amount}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default BlockView;
