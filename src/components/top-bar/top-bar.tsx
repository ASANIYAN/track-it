"use client";

import { HambergerMenu, Notification, ProfileCircle } from "iconsax-react";
import AddButton from "../buttons/add-button";
import SearchBar from "../search-bar/search-bar";
import { Cycle } from "framer-motion";

type TopBarProps = {
    cycleOpen: Cycle
}

const TopBar: React.FC<TopBarProps> = ({ cycleOpen }) => {
    const handleToggle = () => {
        cycleOpen();
    }

    return (
        <section className="flex px-1 py-3.5 items-center justify-between md:p-5 shadow-two bg-white dark:shadow-darkTwo dark:bg-darkColor5">
            <HambergerMenu onClick={handleToggle} className="cursor-pointer pl-3 md:hidden" size="32" color="#848588" />
            <h2 className="hidden md:block text-color1 text-xl font-medium dark:text-white "> Home </h2>
            <section className="flex items-center gap-3">
                <div className="hidden xxs:block">
                    <SearchBar />
                </div>
                <AddButton />
                <Notification size="20" color="#848588"/>
                <ProfileCircle size="20" color="#848588"/>
            </section>
        </section>
    );
}
 
export default TopBar;