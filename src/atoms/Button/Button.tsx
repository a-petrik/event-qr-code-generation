import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

export type ButtonProps = {
  type: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  value: string;
  disabled: boolean;
};

export function Button({ type, value, disabled }: ButtonProps) {
  return (
    <button className={styles.button} type={type} disabled={disabled}>
      {value}
    </button>
  );
}
