import type { ChangeEvent } from "react";

export type HandleInputChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => void;

export type SaveFormData = (
  name: string,
  value: string | number | boolean,
) => void;
