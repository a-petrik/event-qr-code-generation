import { QRCodeCanvas } from "qrcode.react";
import { memo, useEffect, useRef } from "react";
import logo from "../../img/logos/TimeTree_Green_Symbol.svg";
import styles from "./QRCode.module.scss";

type QRCodeProps = {
  url: string;
};

const QRCode = memo(function QRCode({ url }: QRCodeProps) {
  const ref = useRef<null | HTMLCanvasElement>(null);

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  return (
    <QRCodeCanvas
      value={url}
      size={300}
      fgColor={"#2ECC87"}
      level={"L"}
      imageSettings={{
        src: logo,
        height: 80,
        width: 80,
        excavate: false,
      }}
      className={styles.QRCode}
      ref={ref}
    />
  );
});

export default QRCode;
