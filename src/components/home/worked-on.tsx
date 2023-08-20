
import { useCycle, motion } from "framer-motion";

import DropdownHeading from "../headings/dropdown-heading";
import CheckBox from "../inputs/checkbox";
import { useEffect, useRef } from "react";

type WorkedOnProps = {
    heading: string,
};

const WorkedOn: React.FC<WorkedOnProps> = ({ heading }) => {
    const [open, cycleOpen] = useCycle(false, true);
    const workedOnRef = useRef<HTMLDivElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        console.log(target.value); 
    }

    const scrollToSectionHandler = () => {
        if (workedOnRef && workedOnRef.current) {
            // window.scrollTo({
            //     top: workedOnRef.current.offsetTop,
            //     behavior: "smooth"
            // });
            workedOnRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // useEffect(() => {
    //     if (workedOnRef && workedOnRef.current) {
    //         workedOnRef.current.scrollIntoView({ behavior: 'smooth' });
    //         // window.scrollTo({
    //         //     top: workedOnRef.current.offsetTop,
    //         //     behavior: "smooth"
    //         // });
    //     }
    // }, [workedOnRef])


    return (
        <>
            <section onClick={scrollToSectionHandler}>
                <DropdownHeading heading={heading} cycleOpen={cycleOpen} open={open} />
            </section>
            
            { open &&
                <>
                    <div className="border-b border-b-color4 w-full h-0.5 dark:border-b-darkColor4 mt-6"></div>
                    <motion.section
                        ref={workedOnRef}
                        initial={{ height: 0, opacity: 0}}
                        animate={{height: 100, opacity: 1}}
                        exit={{ height: 0, opacity: 0 }}
                    >
                        <section className="border-b border-b-color4 bg-white p-2 dark:border-b-darkColor4 flex items-center justify-between">
                            <section className="flex items-center gap-2">
                                <CheckBox 
                                    name="workedOnCheck"
                                    handleClick={handleClick}
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
        </>
    );
}
 
export default WorkedOn;