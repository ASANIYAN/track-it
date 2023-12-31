import useOutsideClick from "@/hooks/useOutsideClick";
import Image from "next/image";
import { useState } from "react";


const ProjectCardOption = ({}) => {
    const handleCardClosure = () => setOpen(false);

    const ref = useOutsideClick(handleCardClosure);
    
    const [open, setOpen] = useState<boolean>(false);

    const handleClick = () => setOpen(open => !open);

    return (
            <section
                ref={ref}
            >
                <div className="">
                    <Image
                        width={16}
                        height={16}
                        src={"/assets/icons/ellipsis.svg"}
                        alt="ellipsis"
                        className="cursor-pointer"
                        onClick={handleClick}
                    />
                </div>
                <section
                    className={`w-[200px] ${open ? 'h-[190px] sm:h-[225px] opacity-100 z-10' : 'h-0 opacity-0 z-0'} transition-all absolute top-10 right-2.5 flex flex-col 
                    justify-start gap-1 sm:gap-2 rounded-[10px] bg-white shadow-four text-color1 p-2 text-[11px] sm:text-[13px] font-normal 
                    w-xl dark:bg-darkColor4 dark:shadow-darkThree dark:text-white`}
                >
                    <p className="rounded-md p-2 hover:bg-color13 hover:dark:bg-darkColor5 cursor-pointer"> Share </p>
                    <p className="rounded-md p-2 hover:bg-color13 hover:dark:bg-darkColor5 cursor-pointer"> Share </p>
                    <p className="rounded-md p-2 hover:bg-color13 hover:dark:bg-darkColor5 cursor-pointer"> Share </p>
                    <p className="rounded-md p-2 hover:bg-color13 hover:dark:bg-darkColor5 cursor-pointer"> Share </p>
                    <p className="rounded-md p-2 hover:bg-color13 hover:dark:bg-darkColor5 cursor-pointer"> Share </p>
                </section>
            </section>
    );
}
 
export default ProjectCardOption;