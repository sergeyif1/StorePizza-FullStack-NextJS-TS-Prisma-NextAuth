import "./globals.css";
import { Nunito } from "next/font/google";
import { Toaster } from "react-hot-toast";

const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>

      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
