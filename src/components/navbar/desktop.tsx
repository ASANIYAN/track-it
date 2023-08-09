"use client";

import { Add, ArrowDown2, ArrowUp2, Calendar, DocumentText, Home, Message2, People, TickCircle } from "iconsax-react";
import Image from "next/image";
import "./desktop.css";
import { useState } from "react";

const navigation = [
    { title: "Home", icon: <Home size="18" className="dark:text-white text-color2" /> },
    { title: "My Tasks", icon: <TickCircle size="18" className="dark:text-white text-color2" /> },
    { title: "My Plan", icon: <Calendar size="18" className="dark:text-white text-color2" /> },
    { title: "Inbox", icon: <Message2 size="18" className="dark:text-white text-color2" /> },
    { title: "People", icon: <People size="18" className="dark:text-white text-color2" /> },
    { title: "Reporting", icon: <DocumentText size="18" className="dark:text-white text-color2" /> }
];

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
        <aside className="bg-white dark:bg-darkColor5 shadow-one dark:shadow-darkOne w-[240px] h-screen overflow-x-hidden overflow-y-auto">
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
                <input 
                    type="text" 
                    className="border border-color4 dark:border-darkColor4 text-sm h-[38px] outline-none rounded-2xl pl-3 placeholder:pl-3 w-[148px]" 
                    placeholder="Search Project" 
                />
                <div className="rounded-[50%] text-white w-[32px] h-[32px] bg-color6 flex items-center justify-center"> <Add size="24" color="#FFF"/> </div>
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

        </aside>
    );
}
 
export default Desktop;