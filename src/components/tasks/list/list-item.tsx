import Image from "next/image";
import { useState, useEffect } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import move_task_icon from "../../../../public/assets/icons/move_task_icon.svg";
import task_uncheck_icon from "../../../../public/assets/icons/task_uncheck_icon.svg";
import task_check_icon from "../../../../public/assets/icons/task_check_icon.svg";

type ItemData = {
  task: string;
  due: string;
  id: string;
  listId: string;
  originalListId?: string;
  originalDue?: string;
};

type ListItemProps = {
  data: ItemData;
  onCheck: (id: string, checked: boolean) => void;
  isCompleted?: boolean;
};

const ListItem: React.FC<ListItemProps> = ({
  data,
  onCheck,
  isCompleted = false,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: data.id,
    data: {
      type: "task",
      task: data,
    },
  });

  const [hover, setHover] = useState(false);
  const [check, setCheck] = useState(isCompleted);

  useEffect(() => {
    setCheck(isCompleted);
  }, [isCompleted]);

  const handleMouseEnter = () => setHover(true);
  const handleMouseOut = () => setHover(false);

  const handleCheck = () => {
    const newCheckState = !check;
    setCheck(newCheckState);
    onCheck(data.id, newCheckState);
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    zIndex: isDragging ? 1 : undefined,
  };

  return (
    <section
      ref={setNodeRef}
      style={style}
      className={`touch-none w-full ${isDragging ? "cursor-grabbing" : ""}`}
    >
      <section
        className="flex items-center justify-between py-1.5 mt-2 relative pl-5"
        onMouseLeave={handleMouseOut}
        onMouseEnter={handleMouseEnter}
      >
        {(hover || isDragging) && (
          <Image
            src={move_task_icon}
            height={10}
            width={8}
            alt="move_task_icon"
            className={`absolute left-1 ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            {...attributes}
            {...listeners}
          />
        )}
        <section className="flex items-center justify-between w-full">
          <section className="flex items-center gap-2 w-fit">
            <section className="">
              <Image
                src={check ? task_check_icon : task_uncheck_icon}
                height={14}
                width={14}
                alt={check ? "task_check_icon" : "task_uncheck_icon"}
                className="cursor-pointer"
                onClick={handleCheck}
              />
            </section>
            <span
              className={`xs:text-sm font-normal text-color1 dark:text-white ${
                check ? "line-through opacity-50" : ""
              }`}
            >
              {data.task}
            </span>
          </section>
          <section className="flex items-center gap-10">
            <p className="text-color7 text-[11px] xs:text-xs dark:text-darkColor6 w-[120px]">
              {data.due}
            </p>
          </section>
        </section>
      </section>
      <div className="border border-color4 dark:border-darkColor8 h-[1px] w-full" />
    </section>
  );
};

export default ListItem;
