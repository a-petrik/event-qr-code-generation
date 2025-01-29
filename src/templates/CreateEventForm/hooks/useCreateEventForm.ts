import { type FormEvent, useState } from "react";
import { z } from "zod";
import type { HandleInputChange, SaveFormData } from "../../../shared/types";
import { generateQR } from "../helpers/generateQR";

type HandleSubmit = (e: FormEvent<HTMLFormElement>) => void;

const fieldSchema = z.object({
  isValid: z.boolean(),
  errorText: z.string(),
});

const formSchema = z
  .object({
    title: fieldSchema.extend({
      value: z
        .string()
        .min(1, { message: "タイトルを入力してください" })
        .max(50, { message: "最大文字数(50)を超えています" }),
    }),
    startDateTime: fieldSchema.extend({
      value: z.number(),
    }),
    endDateTime: fieldSchema.extend({
      value: z.number(),
    }),
    allDay: fieldSchema.extend({
      value: z.boolean(),
    }),
    note: fieldSchema.extend({
      value: z
        .string()
        .max(2000, { message: "最大文字数(2000)を超えています" }),
    }),
    location: fieldSchema.extend({
      value: z.string().max(100, { message: "最大文字数(100)を超えています" }),
    }),
    url: fieldSchema.extend({
      value: z.union([
        z
          .string()
          .url({ message: "URL形式ではありません" })
          .max(2048, { message: "最大文字数(2048)を超えています" }),
        z.literal(""),
      ]),
    }),
  })
  .refine(
    (data) => {
      let timeDiff = data.endDateTime.value - data.startDateTime.value;
      if (data.allDay.value) {
        const start = new Date(data.startDateTime.value).setHours(0, 0, 0, 0);
        const end = new Date(data.endDateTime.value).setHours(23, 59, 59, 999);
        timeDiff = end - start;
      }
      return timeDiff > 0;
    },
    { message: "開始日時が終了日時を超えています", path: ["endDateTime"] },
  );

export type FormData = z.infer<typeof formSchema>;

export type Inputs = {
  [K in keyof FormData]: K;
};

export type InputName = keyof FormData;

const STORAGE_DATA = "formData";

const initialFormState: FormData = {
  title: {
    value: "",
    isValid: false,
    errorText: "",
  },
  startDateTime: {
    value: new Date().setHours(12, 0, 0, 0) + 1000 * 60 * 60 * 24,
    isValid: true,
    errorText: "",
  },
  endDateTime: {
    value: new Date().setHours(12, 0, 0, 0) + 1000 * 60 * 60 * 24 * 2,
    isValid: true,
    errorText: "",
  },
  allDay: {
    value: false,
    isValid: true,
    errorText: "",
  },
  note: {
    value: "",
    isValid: true,
    errorText: "",
  },
  location: {
    value: "",
    isValid: true,
    errorText: "",
  },
  url: {
    value: "",
    isValid: true,
    errorText: "",
  },
};

function useCreateEventForm() {
  const [formData, setFormData] = useState<FormData>(() => {
    const storageData = localStorage.getItem(STORAGE_DATA);
    if (storageData != null) {
      return JSON.parse(storageData);
    }
    return JSON.parse(JSON.stringify(initialFormState));
  });

  const [QRCodeURL, setQRCodeURL] = useState("");

  const saveFormData: SaveFormData = (name, value) => {
    setFormData((prevState): FormData => {
      const newState = {
        ...prevState,
        [name]: {
          value: value,
          isValid: true,
          errorText: "",
        },
      };
      for (const field of Object.values(newState)) {
        field.isValid = true;
        field.errorText = "";
      }
      const parsed = formSchema.safeParse(newState);
      if (!parsed.success) {
        for (const issue of parsed.error.issues) {
          const fieldName = issue.path[0] as InputName;
          newState[fieldName].isValid = false;
          newState[fieldName].errorText = issue.message;
        }
      }
      localStorage.setItem(STORAGE_DATA, JSON.stringify(newState));
      return newState;
    });
  };

  const handleInputChange: HandleInputChange = (e) => {
    const { name, value } = e.target;
    saveFormData(name, value);
  };

  const handleSubmit: HandleSubmit = async (e) => {
    e.preventDefault();
    setQRCodeURL(await generateQR(formData));
    setFormData(JSON.parse(JSON.stringify(initialFormState)));
    localStorage.removeItem(STORAGE_DATA);
  };

  return {
    handleSubmit,
    handleInputChange,
    saveFormData,
    formData,
    QRCodeURL,
  };
}

export default useCreateEventForm;
