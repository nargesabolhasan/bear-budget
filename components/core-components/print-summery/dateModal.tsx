import React from "react";
import IModal from "@/components/molecules/modal";
import DateFilteredTransactions, {
  DatePickerForm,
} from "@/components/core-components/date-filter/dateFilteredTransactions";
import { printRoute } from "@/routes/routes";
import { useRouter } from "next/navigation";
import useCalendarUtils from "@/hooks/useCalendarUtils";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const DateModal = ({ open, handleClose }: Props) => {
  const router = useRouter();
  const { toStandardISO } = useCalendarUtils();

  const submitSearch = (
    _: DatePickerForm,
    form: {
      year: number;
      month: number;
      monthName: string;
    },
  ) => {
    const iso = toStandardISO({ year: form.year, month: form.month });
    router.push(printRoute.href(iso.month, iso.year, form.month, form.year));
  };

  return (
    <div>
      <IModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-date-Filter"
        aria-describedby="modal-selected-date-Filter"
      >
        <DateFilteredTransactions submitSearch={submitSearch} />
      </IModal>
    </div>
  );
};

export default DateModal;
