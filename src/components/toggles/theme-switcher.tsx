"use client";

import { useTheme } from "next-themes";

import { Moon, Sun1 } from "iconsax-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const ThemeSwitcher = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  const pathname = usePathname();
  const allowedPaths = [
    "/login",
    "/sign-up",
    "/verify-email",
    "/reset-password",
    "/resend-email",
    "/forgot-password",
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <Sun1
          size="24"
          color="#5f48ea"
          className="cursor-pointer"
          onClick={() => setTheme("light")}
        />
      );
    } else {
      return (
        <Moon
          size="24"
          color="#5f48ea"
          className="cursor-pointer"
          onClick={() => setTheme("dark")}
        />
      );
    }
  };

  return (
    <>
      {allowedPaths.includes(pathname) && (
        <section className="flex ml-3 mt-3">renderThemeChanger()</section>
      )}
    </>
  );
};

export default ThemeSwitcher;
