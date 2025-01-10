import { useMemo } from "react";
import { Add } from "iconsax-react";
import Image from "next/image";
import BoardItem, { BoardData } from "./board-item";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type BoardProps = {
  id: string | number;
  title: string;
  allTask: BoardData[];
  onTaskStateChange: (taskId: number, isCompleted: boolean) => void;
};

export const boardTasks = [
  {
    task: "Customer Experience Insight",
    due: "Tuesday",
    id: 1,
    columnId: "in-progress",
  },
  {
    task: "Work Insight",
    due: "Thursday",
    id: 2,
    columnId: "pending",
  },
  {
    task: "Jobs Insight",
    due: "Friday",
    id: 3,
    columnId: "completed",
  },
];

const Board: React.FC<BoardProps> = ({
  id,
  title,
  allTask,
  onTaskStateChange,
}) => {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
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
  const taskIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  return (
    <section className="w-full min-w-[260px]" ref={setNodeRef}>
      <section
        className="w-full max-lg:touch-none"
        {...attributes}
        {...listeners}
        style={style}
      >
        <section className="flex items-center justify-between">
          <span className="text-sm font-medium">{title}</span>
          <section className="flex items-center gap-2.5">
            <Add
              width={10}
              height={10}
              className="text-color2 dark:text-darkColor7 cursor-pointer"
            />
            <Image
              width={16}
              height={16}
              src="/assets/icons/ellipsis.svg"
              alt="ellipsis"
              className="cursor-pointer"
            />
          </section>
        </section>

        <section className="flex flex-col gap-5 mt-5">
          <SortableContext items={taskIds}>
            {tasks.map((task) => (
              <BoardItem
                key={task.id}
                data={task}
                onTaskStateChange={onTaskStateChange}
              />
            ))}
          </SortableContext>
        </section>
      </section>
    </section>
  );
};

export default Board;
