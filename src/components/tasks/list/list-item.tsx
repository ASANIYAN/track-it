import Image from "next/image";
import { useState } from "react";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import move_task_icon from "../../../../public/assets/icons/move_task_icon.svg";
import task_uncheck_icon from "../../../../public/assets/icons/task_uncheck_icon.svg";
import task_check_icon from "../../../../public/assets/icons/task_check_icon.svg";

type ItemData = {
  task: string;
  tag: string;
  color: string;
  properties: string;
  due: string;
  id: number;
};

type ListItemProps = {
  data: ItemData;
};

const ListItem: React.FC<ListItemProps> = ({ data }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: data.id });

  const [hover, setHover] = useState(false);
  const [check, setCheck] = useState(false);

  const handleMouseEnter = () => setHover(true);
  const handleMouseOut = () => setHover(false);

  const handleCheck = () => {
    setCheck((check) => !check);
  };

  return (
    <section
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
      className="touch-none w-full"
    >
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
            className="absolute left-1 cursor-grab"
            {...attributes}
            {...listeners}
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
              {data.task}{" "}
            </span>
          </section>

          <section className="flex items-center gap-10">
            <div className="w-[120px]">
              <span className="bg-[#F78234] rounded-[10.5px] text-white px-2 py-0.5 text-xs">
                {" "}
                {data.tag}
              </span>
            </div>
            <section className="flex gap-1 items-center w-[120px]">
              <div className="h-1.5 w-1.5 rounded-sm bg-[#5197F8] " />
              <span className="text-color7 text-[12px] dark:text-darkColor6">
                {" "}
                {data.properties}{" "}
              </span>
            </section>
            <p className="text-color7 text-[11px] xs:text-xs dark:text-darkColor6 w-[120px]">
              {" "}
              {data.due}{" "}
            </p>
          </section>
        </section>
      </section>
      <div className="border border-color4  dark:border-darkColor8 h-[1px] w-full" />
    </section>
  );
};

export default ListItem;
