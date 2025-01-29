import { DateTime } from "luxon";
import type { FormData } from "../hooks/useCreateEventForm";

const createTimeData = (timestamp: number, allDay: boolean) => {
  let timeData = DateTime.fromMillis(timestamp);
  if (allDay) {
    timeData = timeData.setZone("UTC+0").startOf("day");
  }
  return timeData.toISO({ suppressMilliseconds: true });
};

export const compress = async (string: string) => {
  const stream = new Blob([string], {
    type: "application/json",
  }).stream();

  const compressedReadableStream = stream.pipeThrough(
    new CompressionStream("gzip"),
  );

  const compressedResponse = new Response(compressedReadableStream);

  const blob = await compressedResponse.blob();

  const buffer = await blob.arrayBuffer();

  const compressedBase64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));

  const base64url = compressedBase64
    .replace(/=+$/, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return base64url;
};

const b64decode = (string: string): ArrayBuffer => {
  const binaryString = atob(string);
  const len = binaryString.length;
  const bytes = new Uint8Array(new ArrayBuffer(len));
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export const decompress = async (string: string) => {
  const base64tmp = string.replace(/-/g, "+").replace(/_/g, "/");
  const padding =
    string.length % 4 === 0 ? "" : "=".repeat(4 - (string.length % 4));
  const base64string = base64tmp + padding;

  const stream = new Blob([b64decode(base64string)], {
    type: "application/json",
  }).stream();

  const compressedReadableStream = stream.pipeThrough(
    new DecompressionStream("gzip"),
  );

  const resp = new Response(compressedReadableStream);

  const blob = await resp.blob();

  return await blob.text();
};

export const generateQR = async (formData: FormData) => {
  const allDay = formData.allDay.value;
  const start = createTimeData(formData.startDateTime.value, allDay);
  const end = createTimeData(formData.endDateTime.value, allDay);

  const QRCodeObj = {
    c: 1,
    t: formData.title.value,
    n: formData.note.value,
    s: start,
    e: end,
    a: allDay,
    l: formData.location.value,
    u: formData.url.value,
  };

  const QRCodeString = JSON.stringify(QRCodeObj);

  const base64url = await compress(QRCodeString);

  const QRCodeURL = `https://timetr.ee/ne/${base64url}`;

  return QRCodeURL;
};
