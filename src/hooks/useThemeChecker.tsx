import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const useThemeChecker = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const [ themeChecker, setThemeChecker ] = useState<boolean>(false);
    
    useEffect(() => {
        const currentTheme = theme === 'system' ? systemTheme : theme;
        if (currentTheme === 'dark') {
            setThemeChecker(true);
        } else {
            setThemeChecker(false);
        }
    }, [theme, systemTheme]);

    return {  setTheme, themeChecker, setThemeChecker }
}