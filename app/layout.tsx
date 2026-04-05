import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Prime Ice Pop | The Ultimate Freeze",
  description: "Experience the ultimate hydration with Prime Ice Pop. Zero sugar, 10% coconut water.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
