"use client";
import React, { Fragment, useState } from "react";
import { useBudgetStore } from "@/store/budget";
import useFilterTransaction from "@/hooks/useFilterTransaction";
import { getCurrentMonthName, PERSIAN_MONTHS } from "@/utils/dateList";
import TagListHeader from "@/components/tag-list/tagListHeader";
import { useRouter } from "next/navigation";
import { budgetRoutes } from "@/routes/routes";
import IButton from "@/components/atoms/button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import BudgetItems from "@/components/budget-list/budgetItems";
import ScrollDatePicker from "@/components/atoms/scrollDatePicker";
import { useForm } from "react-hook-form";
import { Render } from "@/utils/render";
import EventNoteTwoToneIcon from "@mui/icons-material/EventNoteTwoTone";
import { openDialog } from "@/components/molecules/dialogContainer";
import { toast } from "sonner";
import PrinterViewTitle from "@/components/printer-demo/printerViewTitle";
import { useTagsStore } from "@/store/tags";
import ScrollToBottom from "@/components/molecules/scrollToBottom";

const BudgetList = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const { budgets, removeBudget, clear } = useBudgetStore();
  const { tags } = useTagsStore();

  const { watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      month: getCurrentMonthName("fa"),
    },
  });

  const selectedMonth = watch("month");

  const { filteredTransactions } = useFilterTransaction({
    tags,
    monthList: PERSIAN_MONTHS,
    filterMonth: selectedMonth,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddNewBudget = () => router.push(budgetRoutes.createBudget.href);

  const onSubmit = () => {
    handleClose();
  };

  const handleEdit = (id: string) => {
    router.push(budgetRoutes.editBudget(id));
  };

  const handleDelete = (id: string) => {
    openDialog({
      title: "Remove Budget",
      hint: (
        <span>
          Remove <strong>{tags?.[id]?.name}</strong> forever!
        </span>
      ),
      confirmHandler: () => {
        removeBudget(id);
        toast.success(<span>Deleted successfully.</span>);
      },
    });
  };

  return (
    <div className="md:w-1/2 mx-auto flex flex-col items-center justify-center pb-20">
      {/* Header */}
      <PrinterViewTitle title={"All Budgets:"} />
      <section className="flex flex-col sm:flex-row items-center gap-1 sm:justify-between py-2 print:!hidden">
        <IButton
          size="small"
          variant="outlined"
          className="w-full sm:w-fit flex flex-row gap-1 items-center justify-center !mt-4"
          onClick={handleOpen}
        >
          Select Month <EventNoteTwoToneIcon color="primary" />
        </IButton>

        <TagListHeader
          clearAllTags={clear}
          handleAddMore={handleAddNewBudget}
        />
      </section>

      {/* Empty State */}
      <Render when={filteredTransactions.size === 0}>
        <p className="text-placeholder mt-10">No Budget for this Month</p>
      </Render>

      {/* List */}
      <Render
        when={filteredTransactions.size > 0}
        fallback={
          <div className="w-full animate-pulse bg-placeholder rounded-md" />
        }
      >
        <ul className={"border-t border-dashed border-placeholder mt-4"}>
          {[...filteredTransactions].map(([tagId, { totalAmount: spent }]) => {
            const budget = budgets[tagId];
            const budgetAmount = parseInt(budget?.amount);

            return (
              <Fragment key={tagId}>
                {!!budgetAmount && (
                  <BudgetItems
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    tag={tags?.[tagId]}
                    tagId={tagId}
                    budgetAmount={budgetAmount}
                    spent={spent}
                  />
                )}
              </Fragment>
            );
          })}
        </ul>
        <ScrollToBottom />
      </Render>

      {/* Month Selection Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "var(--color-neutral_light)",
            borderRadius: 15,
            boxShadow: 15,
            p: 4,
            width: "fit-content",
            height: "fit-content",
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-center px-10 gap-8"
          >
            <ScrollDatePicker
              dateList={PERSIAN_MONTHS}
              defaultValue={getCurrentMonthName("fa")}
              title="month"
              watch={watch}
              setValue={setValue}
            />

            <IButton type="submit">Select</IButton>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default BudgetList;
