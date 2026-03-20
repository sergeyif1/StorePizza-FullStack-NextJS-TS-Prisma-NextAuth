import React from "react";

export const metadata = {
  title: "Next.js",
  description: "Generation by Next.js to the Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      DASHBOARD HEADER
      <body>{children}</body>
    </html>
  );
}
