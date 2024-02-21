import Image from "next/image";
import { useState } from "react";

import move_task_icon from "../../../public/assets/icons/move_task_icon.svg";
import task_uncheck_icon from "../../../public/assets/icons/task_uncheck_icon.svg";
import task_check_icon from "../../../public/assets/icons/task_check_icon.svg";

const ListItem = () => {
  const [hover, setHover] = useState(false);
  const [check, setCheck] = useState(false);

  const handleMouseEnter = () => setHover(true);
  const handleMouseOut = () => setHover(false);

  const handleCheck = () => setCheck((check) => !check);
  return (
    <section
      className="flex items-center justify-between py-1.5 mt-2 relative pl-5"
      onMouseLeave={handleMouseOut}
      onMouseEnter={handleMouseEnter}
    >
      {hover && (
        <Image
          src={move_task_icon}
          height={10}
          width={8}
          alt="move_task_icon"
          className="absolute left-1 cursor-pointer"
        />
      )}
      <section className="flex items-center justify-between w-full">
        <section className="flex items-center gap-2 w-[280px]">
          <section className="">
            {check ? (
              <Image
                src={task_check_icon}
                height={14}
                width={14}
                alt="task_check_icon"
                className="cursor-pointer"
                onClick={handleCheck}
              />
            ) : (
              <Image
                src={task_uncheck_icon}
                height={14}
                width={14}
                alt="task_uncheck_icon"
                className="cursor-pointer"
                onClick={handleCheck}
              />
            )}
          </section>
          <span className="xs:text-sm font-normal text-color1 dark:text-white">
            {" "}
            Customer Experience Insight{" "}
          </span>
        </section>

        <section className="flex items-center gap-10">
          <div className="w-[120px]">
            <span className="bg-[#F78234] rounded-[10.5px] text-white px-2 py-0.5">
              {" "}
              air
            </span>
          </div>
          <section className="flex gap-1 items-center w-[120px]">
            <div className="h-1.5 w-1.5 rounded-sm bg-[#5197F8] " />
            <span className="text-color7 text-[12px] dark:text-darkColor6">
              {" "}
              Web Design{" "}
            </span>
          </section>
          <p className="text-color7 text-[11px] xs:text-xs dark:text-darkColor6 w-[120px]">
            {" "}
            Thursday{" "}
          </p>
        </section>
      </section>
    </section>
  );
};

export default ListItem;
