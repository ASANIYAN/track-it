"use client";

import Image from "next/image";
import { useState } from "react";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import task_check_icon from "../../../public/assets/icons/task_check_icon.svg";
import task_uncheck_icon from "../../../public/assets/icons/task_uncheck_icon.svg";

export type BoardData = {
  task: string;
  tag: string;
  color: string;
  properties: string;
  due: string;
  id: number;
  columnId: number | string;
};

type BoardItemProps = {
  data: BoardData;
};

const BoardItem: React.FC<BoardItemProps> = ({ data }) => {
  const [check, setCheck] = useState(false);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: data.id,
    data: {
      type: "Task",
      data,
    },
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <section
        ref={setNodeRef}
        style={style}
        className="bg-white rounded-[5px] w-full shadow-sm p-3 opacity-50 border border-color4  dark:border-darkColor8 dark:bg-darkColor2 flex flex-col gap-5 max-lg:touch-none cursor-grab"
      >
        <section className="flex items-center gap-2.5">
          <section className="">
            <Image
              src={task_uncheck_icon}
              height={14}
              width={14}
              alt="task_uncheck_icon"
              className="cursor-pointer"
            />
          </section>
          <span className="xs:text-sm font-normal text-color1 dark:text-white">
            {" "}
            {data.task}{" "}
          </span>
        </section>
        <section className="flex items-center gap-x-8 gap-y-2.5">
          <span className="bg-[#F78234] rounded-[10.5px] text-white px-2 py-0.5 text-xs">
            {" "}
            {data.tag}
          </span>
          <p className="text-color7 text-[11px] xs:text-xs dark:text-darkColor6">
            {" "}
            {data.due}{" "}
          </p>
        </section>
        <section className="flex gap-1 items-center w-[120px]">
          <div className="h-1.5 w-1.5 rounded-sm bg-[#5197F8] " />
          <span className="text-color7 text-[12px] dark:text-darkColor6">
            {" "}
            {data.properties}{" "}
          </span>
        </section>
      </section>
    );
  }

  const handleCheck = () => {
    setCheck((check) => !check);
  };
  return (
    <section
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-white rounded-[5px] w-full shadow-sm p-3 border border-color4  dark:border-darkColor8 dark:bg-darkColor2 flex flex-col gap-5 max-lg:touch-none cursor-grab"
    >
      <section className="flex items-center gap-2.5">
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
      <section className="flex items-center gap-x-8 gap-y-2.5">
        <span className="bg-[#F78234] rounded-[10.5px] text-white px-2 py-0.5 text-xs">
          {" "}
          {data.tag}
        </span>
        <p className="text-color7 text-[11px] xs:text-xs dark:text-darkColor6">
          {" "}
          {data.due}{" "}
        </p>
      </section>
      <section className="flex gap-1 items-center w-[120px]">
        <div className="h-1.5 w-1.5 rounded-sm bg-[#5197F8] " />
        <span className="text-color7 text-[12px] dark:text-darkColor6">
          {" "}
          {data.properties}{" "}
        </span>
      </section>
    </section>
  );
};

export default BoardItem;
