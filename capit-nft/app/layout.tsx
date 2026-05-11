import "./styles.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "CAPIT NFT Platform",
  description: "America's plugged well archive onchain."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
