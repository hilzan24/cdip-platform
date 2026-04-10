import "./globals.css";
import { Header } from "@/components/header";

export const metadata = {
  title: "Cayman Data Intelligence Platform",
  description: "Lead intelligence, rental demand analytics, and Cayman market reports."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
