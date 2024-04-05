import type { Metadata } from "next";
import { Permanent_Marker } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

const font = Permanent_Marker({ weight: ["400"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatLFC chatbot",
  description:
    "A chatbot for Liverpool FC fans that provides information about results and goal contributions for LFC from the 2023/24 season.",
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
      <GoogleAnalytics gaId="G-NPGQSN1P7T" />
    </html>
  );
}
