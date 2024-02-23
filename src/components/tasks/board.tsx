import { useMemo, useState } from "react";
import { Add } from "iconsax-react";
import Image from "next/image";
import BoardItem, { BoardData } from "./board-item";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type BoardProps = {
  id: string | number;
  title: string;
  allTask: BoardData[];
};

export const boardTasks = [
  {
    task: "Customer Experience Insight",
    tag: "air",
    color: "#000",
    properties: "Web Design",
    due: "Tuesday",
    id: 1,
    columnId: "in-progress",
  },
  {
    task: "Work Insight",
    tag: "work",
    color: "#056278",
    properties: "Mobile Design",
    due: "Thursday",
    id: 2,
    columnId: "pending",
  },
  {
    task: "Jobs Insight",
    tag: "jobs",
    color: "#123678",
    properties: "App Design",
    due: "Friday",
    id: 3,
    columnId: "completed",
  },
];

const Board: React.FC<BoardProps> = ({ id, title, allTask }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: "Column",
      title,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const tasks = allTask.filter((task) => task.columnId === id);
  const [items, setItems] = useState(boardTasks);
  const taskIds = useMemo(() => {
    return tasks.map((item) => item.id);
  }, [tasks]);
  return (
    <section className="w-full min-w-[260px]" ref={setNodeRef}>
      <section
        className="w-full max-lg:touch-none"
        {...attributes}
        {...listeners}
        style={style}
      >
        <section className="flex items-center justify-between">
          <span className="text-sm font-medium"> {title} </span>
          <section className="flex items-center gap-2.5">
            <Add
              width={10}
              height={10}
              className="text-color2 dark:text-darkColor7 cursor-pointer"
            />
            <Image
              width={16}
              height={16}
              src={"/assets/icons/ellipsis.svg"}
              alt="ellipsis"
              className="cursor-pointer"
              // onClick={handleClick}
            />
          </section>
        </section>
        <section className="flex flex-col gap-5 mt-5">
          <SortableContext items={taskIds}>
            {tasks.map((item, index) => (
              <BoardItem key={`${item.id}-${index}`} data={item} />
            ))}
          </SortableContext>
        </section>
      </section>
    </section>
  );
};

export default Board;
