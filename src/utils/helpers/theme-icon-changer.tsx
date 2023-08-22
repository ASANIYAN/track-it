"use client";

import { useTheme } from "next-themes";

import { ReactElement, useEffect, useState } from "react";

type ThemeIconChangerProps = {
    light: ReactElement,
    dark: ReactElement
}

const ThemeIconChanger: React.FC<ThemeIconChangerProps> = ({ light, dark }) => {
    
    const { systemTheme, theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);


    const renderIconChanger = () => {
        if (!mounted) return null;
        const currentTheme = theme === 'system' ? systemTheme : theme;

        if (currentTheme === 'dark') {
            return dark;
        } else {
            return light;
        }
    };

    return (
        <>
            {renderIconChanger()}
        </>
    );
}
 
export default ThemeIconChanger;