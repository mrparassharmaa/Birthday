import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy 21st Birthday, Jaya! 🎉❤️",
  description: "A super special, interactive 21st birthday experience made with love for Jaya — our Cutie Lal Tamatar 🍅",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Jaya's 21st 🎂",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#05020a",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}
