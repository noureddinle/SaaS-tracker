import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oncree SaaS | Automate Your Freelance Workflow",
  description: "Smart tools for freelancers — proposals, invoices, and payments in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
