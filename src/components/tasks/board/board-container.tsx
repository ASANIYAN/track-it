import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useMemo, useState } from "react";
import { BoardData } from "./board-item";
import Board, { boardTasks } from "./board";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

export type Id = string | number;

type Column = {
  id: Id;
  title: string;
};

export const defaultCols = [
  {
    id: "pending",
    title: "Pending",
  },
  {
    id: "in-progress",
    title: "In-Progress",
  },
  {
    id: "completed",
    title: "Completed",
  },
];

const BoardContainer = () => {
  const [columns, setColumns] = useState(defaultCols);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<BoardData | null>(null);
  const [tasks, setTasks] = useState<BoardData[]>(boardTasks);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const handleTaskStateChange = (taskId: number, isCompleted: boolean) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            columnId: isCompleted ? "completed" : "in-progress",
          };
        }
        return task;
      });
    });
  };

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveColumn(null);
      setActiveTask(null);
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) {
      setActiveColumn(null);
      setActiveTask(null);
      return;
    }

    const isActiveColumn = active.data.current?.type === "Column";

    if (isActiveColumn) {
      setColumns((columns) => {
        const activeColumnIndex = columns.findIndex(
          (col) => col.id === activeId
        );
        const overColumnIndex = columns.findIndex((col) => col.id === overId);
        return arrayMove(columns, activeColumnIndex, overColumnIndex);
      });
    }

    setActiveColumn(null);
    setActiveTask(null);
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        const newTasks = [...tasks];
        const targetColumnId = tasks[overIndex].columnId;
        newTasks[activeIndex] = {
          ...newTasks[activeIndex],
          columnId: targetColumnId,
        };

        // If moving to completed column, update the checked state
        if (targetColumnId === "completed") {
          handleTaskStateChange(Number(activeId), true);
        }

        return arrayMove(newTasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const newTasks = [...tasks];
        newTasks[activeIndex] = {
          ...newTasks[activeIndex],
          columnId: overId,
        };

        // If dropping on completed column, update the checked state
        if (overId === "completed") {
          handleTaskStateChange(Number(activeId), true);
        }

        return arrayMove(newTasks, activeIndex, activeIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <section className="w-full overflow-x-auto no-scrollbar">
        <section className="flex gap-10 w-full min-w-[1000px]">
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <Board
                allTask={tasks}
                key={col.id}
                id={col.id}
                title={col.title}
                onTaskStateChange={handleTaskStateChange}
              />
            ))}
          </SortableContext>
        </section>
      </section>
    </DndContext>
  );
};

export default BoardContainer;
