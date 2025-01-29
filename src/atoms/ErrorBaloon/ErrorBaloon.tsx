import errorMark from "../../img/icons/error.svg";
import styles from "./ErrorBaloon.module.scss";

type ErrorBaloonProps = {
  name: string;
  errorText: string;
};

function ErrorBaloon({ name, errorText }: ErrorBaloonProps) {
  return (
    <div className={styles.errorWrapper}>
      <div id={`${name}-error`} className={styles.errorBaloon} role="alert">
        <img src={errorMark} alt="エラーマーク" />
        {errorText}
      </div>
    </div>
  );
}
export default ErrorBaloon;
