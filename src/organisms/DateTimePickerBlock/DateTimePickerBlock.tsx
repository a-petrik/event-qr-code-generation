import type { ReactNode } from "react";
import styles from "./DateTimePickerBlock.module.scss";

type DateTimePickerBlockProps = {
  children: ReactNode;
};

function DateTimePickerBlock({ children }: DateTimePickerBlockProps) {
  return <div className={styles.block}>{children}</div>;
}
export default DateTimePickerBlock;
