import { Button, type ButtonProps } from "../../atoms/Button";
import Checkbox from "../../atoms/Checkbox";
import DatePickerInput from "../../atoms/DatePickerInput";
import QRCode from "../../atoms/QRCode";
import TextInput from "../../atoms/TextInput";
import Textarea from "../../atoms/Textarea";
import TimePickerInput from "../../atoms/TimePickerInput";
import Field from "../../molecules/Field";
import DateTimePickerBlock from "../../organisms/DateTimePickerBlock";
import useCreateEventForm, { type Inputs } from "./hooks/useCreateEventForm";
import styles from "./CreateEventForm.module.scss";

function Form() {
  const { handleSubmit, handleInputChange, saveFormData, formData, QRCodeURL } =
    useCreateEventForm();

  const isFormValid = Object.values(formData).every((field) => field.isValid);

  const inputs: Inputs = {
    title: "title",
    startDateTime: "startDateTime",
    endDateTime: "endDateTime",
    allDay: "allDay",
    note: "note",
    location: "location",
    url: "url",
  };

  const titleField = {
    label: "予定タイトル",
    name: inputs.title,
    errorText: formData[inputs.title].errorText,
    required: true,
  };

  const titleInput = {
    name: inputs.title,
    value: formData[inputs.title].value,
    required: true,
    handleInputChange,
    showError: formData[inputs.title].errorText.length > 0,
    placeholder: "TimeTree Day",
  };

  const startDateTimeField = {
    label: "開始日時",
    name: inputs.startDateTime,
    errorText: formData[inputs.startDateTime].errorText,
    required: true,
    isDateTimePicker: true,
  };

  const startDateTimeInput = {
    name: inputs.startDateTime,
    value: formData[inputs.startDateTime].value,
    saveFormData,
    showError: formData[inputs.startDateTime].errorText.length > 0,
  };

  const endDateTimeField = {
    label: "終了日時",
    name: inputs.endDateTime,
    errorText: formData[inputs.endDateTime].errorText,
    required: true,
    isDateTimePicker: true,
  };

  const endDateTimeInput = {
    name: inputs.endDateTime,
    value: formData[inputs.endDateTime].value,
    saveFormData,
    showError: formData[inputs.endDateTime].errorText.length > 0,
  };

  const isAllDayCheckboxChecked = formData[inputs.allDay].value;
  const allDayCheckbox = {
    checked: isAllDayCheckboxChecked,
    name: inputs.allDay,
    label: "終日",
    saveFormData,
  };

  const noteField = {
    label: "メモ",
    name: inputs.note,
    errorText: formData[inputs.note].errorText,
    required: false,
  };

  const noteInput = {
    name: inputs.note,
    value: formData[inputs.note].value,
    required: false,
    handleInputChange,
    showError: formData[inputs.note].errorText.length > 0,
    placeholder:
      "本イベントは「普段からTimeTreeを愛用くださっているみなさまに、サービスやわたしたちのことをいろいろ知っていただき、TimeTreeをもっと好きになってもらいたい！」という思いで企画しています。",
  };

  const locationField = {
    label: "場所",
    name: inputs.location,
    errorText: formData[inputs.location].errorText,
    required: false,
  };

  const locationInput = {
    name: inputs.location,
    value: formData[inputs.location].value,
    required: false,
    handleInputChange,
    showError: formData[inputs.location].errorText.length > 0,
    placeholder: "東京都新宿区西新宿6-6-3 新宿国際ビルディング新館503",
  };

  const urlField = {
    label: "添付URL",
    name: inputs.url,
    errorText: formData[inputs.url].errorText,
    required: false,
  };

  const urlInput = {
    name: inputs.url,
    value: formData[inputs.url].value,
    required: false,
    handleInputChange,
    showError: formData[inputs.url].errorText.length > 0,
    placeholder: "https://timetreeapp.com/",
  };

  const submitButton: ButtonProps = {
    type: "submit",
    value: "QRコード生成",
    disabled: !isFormValid,
  };

  return (
    <main className={styles.page}>
      <section className={styles.formWrapper}>
        <h1 id="title" className={styles.formTitle}>
          予定作成QRコードの生成
        </h1>
        <form aria-labelledby="title" onSubmit={handleSubmit}>
          <Field {...titleField}>
            <TextInput {...titleInput} />
          </Field>
          <DateTimePickerBlock>
            <>
              <Field {...startDateTimeField}>
                <div className={styles.dateTimePickerWrapper}>
                  <DatePickerInput {...startDateTimeInput} />
                  {!isAllDayCheckboxChecked && (
                    <TimePickerInput {...startDateTimeInput} />
                  )}
                </div>
              </Field>
              <Field {...endDateTimeField}>
                <div className={styles.dateTimePickerWrapper}>
                  <DatePickerInput {...endDateTimeInput} />
                  {!isAllDayCheckboxChecked && (
                    <TimePickerInput {...endDateTimeInput} />
                  )}
                </div>
              </Field>
              <Checkbox {...allDayCheckbox} />
            </>
          </DateTimePickerBlock>
          <Field {...noteField}>
            <Textarea {...noteInput} />
          </Field>
          <Field {...locationField}>
            <TextInput {...locationInput} />
          </Field>
          <Field {...urlField}>
            <TextInput {...urlInput} />
          </Field>
          <div className={styles.buttons}>
            <Button {...submitButton} />
          </div>
        </form>
      </section>
      {QRCodeURL.length > 0 && (
        <section className={styles.QRCodeWrapper}>
          <h2 className={styles.QRCodeTitle}>生成結果</h2>
          <QRCode url={QRCodeURL} />
        </section>
      )}
    </main>
  );
}
export default Form;
