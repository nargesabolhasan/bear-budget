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
        "flex flex-col border border-placeholder_light2 border-dashed border-r-0 w-fit p-4 rounded-2xl mt-3 mx-auto"
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
        <ul className="space-y-3">
          {list.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.id}
                className={twMerge(
                  "flex flex-row items-center gap-2 border-b-2 w-fit pb-1",
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
