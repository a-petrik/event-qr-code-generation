import type { ReactNode } from "react";
import ErrorBaloon from "../../atoms/ErrorBaloon";
import styles from "./Field.module.scss";

type FieldProps = {
  label: string;
  name: string;
  errorText: string;
  required: boolean;
  isDateTimePicker?: boolean;
  children: ReactNode;
};

function Field({
  label,
  name,
  errorText,
  required,
  isDateTimePicker = false,
  children,
}: FieldProps) {
  return (
    <div
      className={`${styles.field} ${isDateTimePicker ? styles.fieldPicker : ""}`}
    >
      <label htmlFor={name} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      {children}
      {errorText.length > 0 && (
        <ErrorBaloon name={name} errorText={errorText} />
      )}
    </div>
  );
}

export default Field;
