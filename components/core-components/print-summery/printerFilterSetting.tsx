import { Control, Controller, FieldValues } from "react-hook-form";
import { EnumPrinterInputs } from "@/components/core-components/print-summery/type";
import ICheckbox from "@/components/atoms/checkbox";
import i18next from "i18next";
import React from "react";
import IButton from "@/components/atoms/button";
import PrintTwoToneIcon from "@mui/icons-material/PrintTwoTone";

export type FormDataFiltering = {
  [EnumPrinterInputs.TRANSACTION]: boolean;
  [EnumPrinterInputs.BUDGET]: boolean;
  [EnumPrinterInputs.SUMMERY]: boolean;
};

type Props = {
  control: Control<FormDataFiltering, FieldValues, FormDataFiltering>;
};

const PrinterFilterSetting = ({ control }: Props) => {
  const items = [
    {
      id: 1,
      label: i18next.t("global.show", {
        value: i18next.t("home.financialSummary"),
      }),
      name: EnumPrinterInputs.SUMMERY,
    },
    {
      id: 2,
      label: i18next.t("global.show", { value: i18next.t("global.budgets") }),
      name: EnumPrinterInputs.BUDGET,
    },
    {
      id: 3,
      label: i18next.t("global.show", {
        value: i18next.t("global.transactions"),
      }),
      name: EnumPrinterInputs.TRANSACTION,
    },
  ];

  const submitForm = () => {
    window.print();
  };

  return (
    <section
      className={
        "bg-primary_light my-3 w-full rounded-4xl p-6 md:w-fit print:hidden"
      }
    >
      <form
        className={
          "text-dark mx-auto flex w-fit flex-col items-center justify-center gap-5"
        }
        onSubmit={submitForm}
      >
        <div className="flex flex-col items-start gap-3 md:flex-row">
          {items.map((item) => (
            <Controller
              key={item.id}
              name={item.name}
              control={control}
              defaultValue={true}
              render={({ field }) => (
                <ICheckbox
                  id={item.name}
                  checked={field.value}
                  onChange={(val) => {
                    field.onChange(val);
                  }}
                  label={item.label}
                  color={"primary"}
                />
              )}
            />
          ))}
        </div>
        <IButton
          type={"submit"}
          size={"small"}
          className={"w-full self-center"}
          color={"primary"}
          variant={"outlined"}
        >
          <PrintTwoToneIcon fontSize={"large"} color={"primary"} />
        </IButton>
      </form>
    </section>
  );
};

export default PrinterFilterSetting;
