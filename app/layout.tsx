import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const SegmentFont = localFont({
  src: "../public/Seven Segment.ttf",
  variable: "--font-segment",
});
const FuturaBoldFont = localFont({
  src: "../public/Futura Bold font.ttf",
  variable: "--font-futura",
});

export const metadata: Metadata = {
  title: "Slot machine",
  description: "An exciting slot machine game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${SegmentFont.variable} ${FuturaBoldFont.variable} font-display`}
      >
        {children}
      </body>
    </html>
  );
}
