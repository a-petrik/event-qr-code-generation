import { describe, expect, test } from "vitest";
import { compress, decompress } from "./generateQR";

const testObj = {
  c: 1,
  t: "TimeTree Frontendコーディング試験",
  n: "こちらはコーディング試験用のQRコードのサンプルです。",
  s: "2024-11-21T09:00:00+09:00",
  e: "2024-11-21T18:00:00+09:00",
  a: false,
  l: "TimeTree, Inc.",
  u: "https://www.notion.so/timetree/TimeTree-Frontend-21fb01ac70bb4a2781622bbbd33eefbe",
};

describe("gzip + base64url test", () => {
  test("compare comressed data to known in advance base64url", async () => {
    const base64url =
      "H4sIAAAAAAAACnWQQUrDQBiFr1Le1kkyMy22zgEEl0oukEknGGgnkoxkIYIzWUjXFcSlCFoRqlDc9Tb_Qr2FKARUcPfg-97ivTPkUILBQSEt5yatjRns15V1xk4pbKjbUndJ4Y66DYWX98f7j9USDBYK5JfkbyksyD__p75drcivD496viC_pvD6pXTX1D2RfyB_QxcBDA0UJJejSIhIipTvKc4V5zvfAQzmNxeTPzyDKrJZYxhmP9awwYHNYzCcQuHYuZNGJUnbtrGtXFnZuKkSV86Nq41J-k7UPxBJUWgusnzMtR5lcjwRu1JqrafDoTGFNjj_BF5RqjhCAQAA";
    const compressed = await compress(JSON.stringify(testObj));
    expect(compressed).toBe(base64url);
  });
  test("decompressed string is equal to compressed origin", async () => {
    const origin = JSON.stringify(testObj);
    const base64url = await compress(origin);
    const decoded = await decompress(base64url as string);
    expect(origin).toBe(decoded);
  });
});
