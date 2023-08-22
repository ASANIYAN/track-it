"use-client";

import { useRef } from "react";

import { useCycle, motion } from "framer-motion";

import DropdownHeading from "../headings/dropdown-heading";
import CheckBox from "../inputs/checkbox/checkbox";

type WorkedOnProps = {
    heading: string,
};

const WorkedOn: React.FC<WorkedOnProps> = ({ heading }) => {
    const [open, cycleOpen] = useCycle(false, true);
    const workedOnRef = useRef<null | HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        console.log(target.checked);
    }

    const handleClick = () => {
        workedOnRef.current?.scrollIntoView({ behavior: 'smooth' });
        console.log("scrolled");
    }


    return (
        <>
            <section onClick={handleClick}>
                <DropdownHeading heading={heading} cycleOpen={cycleOpen} open={open} />
            </section>
            <section
                ref={workedOnRef}
            >
                { open &&
                    <>
                        <div className="border-b border-b-color4 w-full h-0.5 dark:border-b-darkColor4 mt-6"></div>
                        <motion.section
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1, transition: {duration: 0.6}}}
                        >
                            <section className="border-b border-b-color4 bg-white p-2 dark:border-b-darkColor4 dark:bg-darkColor2 flex items-center justify-between">
                                <section className="flex items-center gap-2">
                                    <CheckBox 
                                        name="workedOnCheck"
                                        handleChange={handleChange}
                                    />
                                    <span className="text-sm font-normal text-color1 dark:text-white"> Design Stage</span>
                                </section>
                                <section className="flex items-center gap-10">
                                    <div className="flex gap-1 items-center">
                                        <div className="h-1.5 w-1.5 rounded-sm bg-[#5197F8] "></div>
                                        <span className="text-color7 text-[12px] dark:text-darkColor6"> Web Design </span>
                                    </div>
                                    <p className="text-color7 text-[12px] dark:text-darkColor6"> Thursday </p>
                                </section>
                            </section>
                        </motion.section>
                    </>
                }
            </section>
        </>
    );
}
 
export default WorkedOn;