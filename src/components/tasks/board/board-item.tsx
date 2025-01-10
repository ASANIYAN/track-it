import Image from "next/image";
import { useState, useEffect } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import task_check_icon from "../../../../public/assets/icons/task_check_icon.svg";
import task_uncheck_icon from "../../../../public/assets/icons/task_uncheck_icon.svg";

export type BoardData = {
  task: string;
  due: string;
  id: number;
  columnId: string | number;
};

type BoardItemProps = {
  data: BoardData;
  onTaskStateChange: (taskId: number, isCompleted: boolean) => void;
};

const BoardItem: React.FC<BoardItemProps> = ({ data, onTaskStateChange }) => {
  const [check, setCheck] = useState(data.columnId === "completed");

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

  useEffect(() => {
    setCheck(data.columnId === "completed");
  }, [data.columnId]);

  const handleCheck = () => {
    const newCheckState = !check;
    setCheck(newCheckState);
    onTaskStateChange(data.id, newCheckState);
  };

  const getDraggingContent = () => (
    <section
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-[5px] w-full shadow-sm p-3 opacity-50 border border-color4 dark:border-darkColor8 dark:bg-darkColor2 flex flex-col gap-5 max-lg:touch-none cursor-grab"
    >
      <section className="flex items-center gap-2.5">
        <section>
          <Image
            src={task_uncheck_icon}
            height={14}
            width={14}
            alt="task_uncheck_icon"
            className="cursor-pointer"
          />
        </section>
        <span className="xs:text-sm font-normal text-color1 dark:text-white">
          {data.task}
        </span>
      </section>
      <section className="flex items-center gap-x-8 gap-y-2.5">
        <p className="text-color7 text-[11px] xs:text-xs dark:text-darkColor6">
          {data.due}
        </p>
      </section>
    </section>
  );

  const getContent = () => (
    <section
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-white rounded-[5px] w-full shadow-sm p-3 border border-color4 dark:border-darkColor8 dark:bg-darkColor2 flex flex-col gap-5 max-lg:touch-none cursor-grab"
    >
      <section className="flex items-center gap-2.5">
        <section>
          <Image
            src={check ? task_check_icon : task_uncheck_icon}
            height={14}
            width={14}
            alt={check ? "task_check_icon" : "task_uncheck_icon"}
            className="cursor-pointer"
            onClick={handleCheck}
          />
        </section>
        <span className="xs:text-sm font-normal text-color1 dark:text-white">
          {data.task}
        </span>
      </section>
      <section className="flex items-center gap-x-8 gap-y-2.5">
        <p className="text-color7 text-[11px] xs:text-xs dark:text-darkColor6">
          {data.due}
        </p>
      </section>
    </section>
  );

  return isDragging ? getDraggingContent() : getContent();
};

export default BoardItem;
