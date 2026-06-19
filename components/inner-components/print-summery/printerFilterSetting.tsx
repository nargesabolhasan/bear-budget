import { Control, Controller } from "react-hook-form";
import { EnumPrinterInputs } from "@/components/inner-components/print-summery/type";
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
  control: Control<FormDataFiltering, any, FormDataFiltering>;
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
        "print:hidden w-full md:w-fit p-6 bg-primary_light rounded-4xl my-3"
      }
    >
      <form
        className={
          "text-dark flex flex-col gap-5 items-center justify-center w-fit mx-auto"
        }
        onSubmit={submitForm}
      >
        <div className="flex md:flex-row flex-col items-start gap-3">
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
          className={"self-center w-full"}
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
