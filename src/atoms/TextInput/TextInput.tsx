import type { HandleInputChange } from "../../shared/types";
import styles from "./TextInput.module.scss";

type TextInputProps = {
  name: string;
  value: string;
  required: boolean;
  handleInputChange: HandleInputChange;
  showError: boolean;
  placeholder: string;
};

function TextInput({
  name,
  value,
  required,
  handleInputChange,
  showError,
  placeholder,
}: TextInputProps) {
  return (
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      required={required}
      placeholder={placeholder}
      onChange={handleInputChange}
      className={`${styles.textInput} ${showError ? styles.textInputError : ""}`}
    />
  );
}

export default TextInput;
