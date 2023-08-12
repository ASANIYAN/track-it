"use client";

import Image from "next/image";
import { useState } from "react";

import { navigation } from "@/constants/objects";
import AddButton from "../buttons/add-button";
import SearchBar from "../search-bar/search-bar";

import { motion } from "framer-motion";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";


import "./navbar.css";

const Desktop = () => {
    const [dropDown, setDropDown] = useState<boolean>(false);

    const handleDropDown = () => {
        setDropDown(prevState => !prevState);
    };

    const showIcon = () => {
        return dropDown ? 
            (<ArrowUp2 size="18" color="#848588" className="cursor-pointer" /> )
            : 
            (<ArrowDown2 size="18" className="cursor-pointer" color="#848588" />);
    }

    return (
        <motion.aside 
            className={`hidden md:block bg-white dark:bg-darkColor5 shadow-one dark:shadow-darkOne w-[240px] h-screen overflow-x-hidden overflow-y-auto`}
        >
            <section className="px-2">
                <nav className="pt-6">
                    <ul className="flex flex-col gap-2"> 
                        { navigation.map((item, index) => (
                            <li
                            key={index}
                            className={`text-color2 hover:text-white cursor-pointer dark:text-darkColor3 text-sm font-normal pl-3 
                            py-2 w-[220px] hover:bg-color6 rounded-[6px] flex gap-2.5 items-center`}
                            > 
                                {item.icon} <span> {item.title} </span> 
                            </li>
                        ))}
                    </ul>
                </nav>
                <section className="mb-5 px-3">
                    <section className="flex justify-between mt-5 items-center cursor-pointer" onClick={handleDropDown}>
                        <h4 className="font-medium text-sm text-color9"> Favorites </h4>
                        {showIcon()}
                    </section>
                    { dropDown && 
                        <section className="mt-2.5 space-y-3.5">
                            <p className="flex gap-2.5 items-center cursor-pointer"> 
                                <Image width={20} height={20} src={"/assets/icons/mobile40.svg"} alt="mobile40" /> 
                                <span className="text-color7 dark:text-white text-sm font-normal"> App Development </span> 
                            </p>
                            <p className="flex gap-2.5 items-center cursor-pointer"> 
                                <Image width={20} height={20} src={"/assets/icons/icon.svg"} alt="mobile40" /> 
                                <span className="text-color7 dark:text-white text-sm font-normal"> Web Design </span> 
                            </p>
                        </section>
                    }
                </section>
            </section>

            <div className="border-b h-0.5 border-color4 dark:border-darkColor4" />

            <section className="mt-5 px-2 flex items-center gap-4">
                <SearchBar />
                <AddButton />
            </section>

            <section className="px-3 mt-5">
                <h4 className="font-medium text-sm text-color9"> Projects </h4>
                <section className="mt-2.5 space-y-3.5">
                    <p className="flex gap-2.5 items-center cursor-pointer"> 
                        <Image width={20} height={20} src={"/assets/icons/mobile40.svg"} alt="mobile40" /> 
                        <span className="text-color7 dark:text-white text-sm font-normal"> App Development </span> 
                    </p>
                    <p className="flex gap-2.5 items-center cursor-pointer"> 
                        <Image width={20} height={20} src={"/assets/icons/icon.svg"} alt="mobile40" /> 
                        <span className="text-color7 dark:text-white text-sm font-normal"> Web Design </span> 
                    </p>
                </section>
            </section>

        </motion.aside>
    );
}
 
export default Desktop;