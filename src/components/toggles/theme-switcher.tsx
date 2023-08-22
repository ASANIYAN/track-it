"use client";

import { useTheme } from "next-themes";

import { Moon, Sun1 } from "iconsax-react";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);


    const renderThemeChanger = () => {
        if (!mounted) return null;
        const currentTheme = theme === 'system' ? systemTheme : theme;

        if (currentTheme === 'dark') {
            return (<Sun1 size="24" color="#5f48ea" className="cursor-pointer" onClick={() => setTheme('light')}/>);
        } else {
            return (<Moon size="24" color="#5f48ea" className="cursor-pointer" onClick={() => setTheme('dark')}/>);
        }
    };

    return (
        <>
            {renderThemeChanger()}
        </>
    );
}
 
export default ThemeSwitcher;