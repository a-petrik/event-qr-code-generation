import checkbox from "../../img/checkbox/checkbox.svg";
import checkboxChecked from "../../img/checkbox/checkboxChecked.svg";
import checkboxCheckedDisabled from "../../img/checkbox/checkboxCheckedDisabled.svg";
import checkboxDisabled from "../../img/checkbox/checkboxDisabled.svg";
import type { SaveFormData } from "../../shared/types";
import styles from "./Checkbox.module.scss";

type CheckboxProps = {
  name: string;
  checked: boolean;
  disabled?: boolean;
  label: string;
  saveFormData: SaveFormData;
};

function Checkbox({
  name,
  checked,
  disabled = false,
  label,
  saveFormData,
}: CheckboxProps) {
  let checkboxUrl: string;
  if (checked) {
    checkboxUrl = disabled ? checkboxCheckedDisabled : checkboxChecked;
  } else {
    checkboxUrl = disabled ? checkboxDisabled : checkbox;
  }

  const handleCheckboxChange = () => {
    saveFormData(name, !checked);
  };

  return (
    <div>
      <input
        type="checkbox"
        id={name}
        name={name}
        className={styles.checkbox}
        checked={checked}
        disabled={disabled}
        aria-checked={checked}
        aria-labelledby={`${name}-label`}
        onChange={handleCheckboxChange}
      />
      <label
        htmlFor={name}
        id={`${name}-label`}
        className={styles.checkboxLabel}
      >
        <img src={checkboxUrl} alt="終日チェックボックス" />
        {label}
      </label>
    </div>
  );
}
export default Checkbox;
