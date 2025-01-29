import DatePicker from "react-datepicker";
import type { SaveFormData } from "../../shared/types";
import styles from "./TimePickerInput.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import {
  type KeyboardEventHandler,
  type LegacyRef,
  type MouseEventHandler,
  createElement,
  forwardRef,
} from "react";

type TimePickerInputProps = {
  name: string;
  value: number;
  saveFormData: SaveFormData;
  showError: boolean;
};

function TimePickerInput({
  name,
  value,
  saveFormData,
  showError,
}: TimePickerInputProps) {
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
      const hours = `0${selectedDate.getHours()}`.slice(-2);
      const minutes = `0${selectedDate.getMinutes()}`.slice(-2);
      return (
        <div
          className={`${styles.timePickerInput} ${showError ? styles.timePickerInputError : ""}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
          ref={ref}
        >
          {`${hours}:${minutes}`}
        </div>
      );
    },
  );

  const handleTimePickerChange = (date: Date | null) => {
    if (date instanceof Date) {
      saveFormData(name, date.getTime());
    }
  };

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        name={name}
        onChange={handleTimePickerChange}
        customInput={createElement(CustomInput)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeFormat="HH:mm"
        showTimeCaption={false}
      />
    </div>
  );
}
export default TimePickerInput;
