import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resort Map",
  description: "Interactive resort map with cabana booking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
