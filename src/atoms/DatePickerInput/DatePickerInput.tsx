import DatePicker from "react-datepicker";
import type { SaveFormData } from "../../shared/types";
import styles from "./DatePickerInput.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import {
  type KeyboardEventHandler,
  type LegacyRef,
  type MouseEventHandler,
  createElement,
  forwardRef,
} from "react";

type DatePickerInputProps = {
  name: string;
  value: number;
  saveFormData: SaveFormData;
  showError: boolean;
};

const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];

function DatePickerInput({
  name,
  value,
  saveFormData,
  showError,
}: DatePickerInputProps) {
  const selectedDate = new Date(value);

  const CustomInput = forwardRef(
    (
      {
        onClick,
        onKeyUp,
      }: {
        onClick: MouseEventHandler<HTMLDivElement>;
        onKeyUp: KeyboardEventHandler<HTMLDivElement>;
      },
      ref: LegacyRef<HTMLDivElement>,
    ) => {
      const year = selectedDate.getFullYear();
      const month = `0${selectedDate.getMonth() + 1}`.slice(-2);
      const date = `0${selectedDate.getDate()}`.slice(-2);
      const dayOfWeek = daysOfWeek[selectedDate.getDay()];
      return (
        <div
          className={`${styles.datePickerInput} ${showError ? styles.datePickerInputError : ""}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
          ref={ref}
        >
          {`${year}年${month}月${date}日 ${dayOfWeek}`}
        </div>
      );
    },
  );

  const handleDatePickerChange = (date: Date | null): void => {
    if (date instanceof Date) {
      saveFormData(name, date.getTime());
    }
  };

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        name={name}
        onChange={handleDatePickerChange}
        customInput={createElement(CustomInput)}
      />
    </div>
  );
}
export default DatePickerInput;
