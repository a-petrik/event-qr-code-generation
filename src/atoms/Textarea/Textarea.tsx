import type { HandleInputChange } from "../../shared/types";
import styles from "./Textarea.module.scss";

type TextareaProps = {
  name: string;
  value: string;
  required: boolean;
  handleInputChange: HandleInputChange;
  showError: boolean;
  placeholder: string;
};

function Textarea({
  name,
  value,
  required,
  handleInputChange,
  showError,
  placeholder,
}: TextareaProps) {
  return (
    <textarea
      id={name}
      name={name}
      value={value}
      required={required}
      placeholder={placeholder}
      rows={4}
      onChange={handleInputChange}
      className={`${styles.textarea} ${showError ? styles.textareaError : ""}`}
    />
  );
}

export default Textarea;
