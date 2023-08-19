
import { Cycle } from "framer-motion";

import ThemeIconChanger from "@/utils/theme-icon-changer";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";

type DropdownHeadingProps = {
    heading: string,
    open: boolean,
    cycleOpen: Cycle
};

const DropdownHeading: React.FC<DropdownHeadingProps> = ({ heading, cycleOpen, open }) => {
    const handleClick = () => {
        cycleOpen();
    };

    return (
        <>
            <section 
                className="flex items-center gap-3 w-fit cursor-pointer select-none"
                onClick={handleClick}
                >
                { open ? 
                    (
                        <ThemeIconChanger 
                            light={<ArrowDown2 size="20" color="#5b5c60" variant="Bold"/>} 
                            dark={<ArrowDown2 size="20" color="#D5D6D7" variant="Bold"/>} 
                        />
                    )
                    :
                    (
                        <ThemeIconChanger 
                            light={<ArrowUp2 size="20" color="#5b5c60" variant="Bold"/>} 
                            dark={<ArrowUp2 size="20" color="#D5D6D7" variant="Bold"/>} 
                        />
                    )

                }
                <h3 className="text-color1 text-[15px] font-medium dark:text-white"> { heading } </h3>
            </section>
            <div className="border-b border-b-color4 w-full h-0.5 mt-2.5 dark:border-b-darkColor4"></div>
        </>
    );
}
 
export default DropdownHeading;