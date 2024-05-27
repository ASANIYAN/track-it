import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ThemeSwitcher from "@/components/toggles/theme-switcher";
import { ThemeProvider } from "./theme-provider";

import TanstackProvider from "@/utils/providers/tanstack-provider";

import { ToastContainer } from "react-toastify";
import "react-day-picker/dist/style.css";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home",
  description: "track-it Homepage",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-darkColor1`}>
        <ThemeProvider>
          <TanstackProvider>
            <ToastContainer />
            <header>
              <ThemeSwitcher />
            </header>
            {children}
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
