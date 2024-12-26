import BarcodeScannerComponent from "react-qr-barcode-scanner";
import type { Result } from "@zxing/library";

export default function BarcodeScanner({
  handleScan,
}: {
  handleScan: (err: unknown, result: Result | undefined) => void;
}) {
  return <BarcodeScannerComponent width="100%" onUpdate={handleScan} />;
}
