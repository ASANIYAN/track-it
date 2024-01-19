import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ThemeSwitcher from "@/components/toggles/theme-switcher";
import { ThemeProvider } from "./theme-provider";
import TanstackProvider from "@/utils/providers/tanstack-provider";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname } from "next/navigation";

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
              <section className="flex ml-3 mt-3">
                <ThemeSwitcher />
              </section>
            </header>
            {children}
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
