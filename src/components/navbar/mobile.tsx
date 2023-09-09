import Image from "next/image";
import { useState } from "react";

import { navigation } from "@/constants/objects";
import AddButton from "../buttons/add-button";
import SearchBar from "../search-bar/search-bar";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";

import "./navbar.css";

const projects = [
    {name: 'App Development', img: <Image width={20} height={20} src={"/assets/icons/mobile40.svg"} alt="mobile40" /> },
    {name: 'Web Design', img: <Image width={20} height={20} src={"/assets/icons/icon.svg"} alt="mobile40" /> },
];

type MobileProps = {
    open: boolean,
}

const Mobile: React.FC<MobileProps> = ({open}) => {
    const [dropDown, setDropDown] = useState<boolean>(false);


    const handleDropDown = () => {
        setDropDown(prevState => !prevState);
    };

    const showIcon = () => {
        return dropDown ? 
            (<ArrowUp2 size="18" color="#848588" className="cursor-pointer" /> )
            : 
            (<ArrowDown2 size="18" className="cursor-pointer" color="#848588" />);
    };
    
    const itemVariants = {
        closed: { opacity: 0 },
        open: { opacity: 1 }
    };
    
    const sideVariants = {
        closed: { transition: { staggerChildren: 0.2, staggerDirection: -1 } },
        open: { transition: { staggerChildren: 0.2, staggerDirection: 1 } }
    };

    return (

        <>
            <AnimatePresence>
                { open && 
                    <motion.aside
                        initial={{opacity: 0, x: -100}}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{width: 0, transition: { duration: 0.3 }}}
                        className={`fixed top-[60px] z-50 left-0 md:hidden bg-white dark:bg-darkColor5 shadow-one dark:shadow-darkOne w-[240px] 
                        h-screen overflow-x-hidden overflow-y-auto`}
                    >
                        <motion.section
                            initial="closed"
                            animate="open"
                            variants={sideVariants}
                        >
                            <motion.section
                                initial="closed"
                                animate="open"
                                variants={itemVariants}
                                className="px-2"
                            >
                                <motion.nav className="pt-6">
                                    <motion.ul className="flex flex-col gap-2"> 
                                        { navigation.map((item, index) => (
                                            <motion.li
                                            initial="closed"
                                            animate="open"
                                            variants={itemVariants}
                                            key={index}
                                            className={`text-color2 hover:text-white cursor-pointer dark:text-darkColor3 text-sm font-normal pl-3 
                                            py-2 w-[220px] hover:bg-color6 rounded-[6px] flex gap-2.5 items-center`}
                                            > 
                                                {item.icon} <span> {item.title} </span> 
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </motion.nav>
                                <motion.section className="mb-5 px-3">
                                    <motion.section className="flex justify-between mt-5 items-center cursor-pointer" onClick={handleDropDown}>
                                        <h4 className="font-medium text-sm text-color9"> Favorites </h4>
                                        {showIcon()}
                                    </motion.section>
                                    { dropDown && 
                                        <motion.section className="mt-2.5 space-y-3.5">
                                            { projects.map((project, index) => (
                                                <motion.p key={index} className="flex gap-2.5 items-center cursor-pointer"> 
                                                    {project.img} 
                                                    <span className="text-color7 dark:text-white text-sm font-normal"> {project.name} </span> 
                                                </motion.p>
                                            ))}
                                        </motion.section>
                                    }
                                </motion.section>
                            </motion.section>

                            <motion.div className="border-b h-0.5 border-color4 dark:border-darkColor4" />

                            <motion.section
                                initial="closed"
                                animate="open"
                                variants={itemVariants} 
                                className="mt-5 px-2 flex items-center gap-4"
                            >
                                <SearchBar />
                                <AddButton />
                            </motion.section>

                            <motion.section 
                                variants={itemVariants} 
                                className="px-3 mt-5"
                            >
                                <h4 className="font-medium text-sm text-color9"> Projects </h4>
                                <motion.section className="mt-2.5 space-y-3.5">
                                    { projects.map((project, index) => (
                                        <motion.p key={index} className="flex gap-2.5 items-center cursor-pointer"> 
                                            {project.img} 
                                            <span className="text-color7 dark:text-white text-sm font-normal"> {project.name} </span> 
                                        </motion.p>
                                    ))}
                                </motion.section>
                            </motion.section>
                        </motion.section>

                    </motion.aside>
                }
            </AnimatePresence>
        </>
    )
}
 
export default Mobile;