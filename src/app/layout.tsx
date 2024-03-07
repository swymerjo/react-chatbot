import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat LFC",
  description:
    "LFC chatbot that provides information on the 2023/24 season made by Sammy-Jo Wymer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
