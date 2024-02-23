"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import List from "@/components/tasks/list";
// import Board from "@/components/tasks/board";
import AuthWrapper from "@/components/wrappers/auth-wrapper";

import list_icon from "../../../public/assets/icons/list_icon.svg";
import list_icon_active from "../../../public/assets/icons/list_icon_active.svg";
import board_icon from "../../../public/assets/icons/board_icon.svg";
import board_icon_active from "../../../public/assets/icons/board_icon_active.svg";
import calendar_icon_tasks from "../../../public/assets/icons/calendar_tasks_icon.svg";
import calendar_icon_tasks_active from "../../../public/assets/icons/calendar_tasks_icon_active.svg";
import { BoardData } from "@/components/tasks/board-item";
import { boardTasks } from "@/components/tasks/board";
import Calendar from "@/components/tasks/calendar";

const Board = dynamic(() => import("@/components/tasks/board"), {
  ssr: false,
});

type TabRoute = "list" | "board" | "calendar";

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

export type Id = string | number;

type Column = {
  id: Id;
  title: string;
};

const Tasks = () => {
  const [activeTab, setActiveTab] = useState<TabRoute>("list");
  const [columns, setColumns] = useState(defaultCols);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<BoardData | null>(null);

  const [tasks, setTasks] = useState<BoardData[]>(boardTasks);

  const handleSetActiveTab = (tabValue: TabRoute) => () =>
    setActiveTab(tabValue);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    // setActiveColumn(null);
    // setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
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

    // swaps the position of the task being dragged and the position of the task being displaced
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        const overIndex = tasks.findIndex((t) => t.id === overId);

        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // swaps the position of the column being dragged and the position of the column being displaced
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;

        // triggers a re-render because a new array is being created
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  return (
    <main className="w-full">
      <AuthWrapper>
        <section className="px-1 sm:px-5 mt-4">
          <section className="w-[138px] h-[38px] rounded-lg border border-color4  dark:border-darkColor8 flex items-center justify-evenly">
            <div
              className={`${
                activeTab === "list" && "bg-color16 rounded-l-lg"
              } flex justify-center items-center border-r border-r-color4 dark:border-r-darkColor8 h-full w-full cursor-pointer`}
              onClick={handleSetActiveTab("list")}
            >
              {activeTab === "list" ? (
                <Image
                  height={20}
                  width={20}
                  src={list_icon_active}
                  alt="list_icon_active"
                />
              ) : (
                <Image height={20} width={20} src={list_icon} alt="list_icon" />
              )}
            </div>
            <div
              className={`${
                activeTab === "board" && "bg-color16"
              } flex justify-center items-center border-r border-r-color4 dark:border-r-darkColor8 h-full w-full cursor-pointer`}
              onClick={handleSetActiveTab("board")}
            >
              {activeTab === "board" ? (
                <Image
                  height={20}
                  width={20}
                  src={board_icon_active}
                  alt="board_icon_active"
                />
              ) : (
                <Image
                  height={20}
                  width={20}
                  src={board_icon}
                  alt="board_icon"
                />
              )}
            </div>
            <div
              className={`${
                activeTab === "calendar" && "bg-color16 rounded-r-lg"
              } flex justify-center items-center h-full w-full cursor-pointer`}
              onClick={handleSetActiveTab("calendar")}
            >
              {activeTab === "calendar" ? (
                <Image
                  height={20}
                  width={20}
                  src={calendar_icon_tasks_active}
                  alt="calendar_icon_tasks_active"
                />
              ) : (
                <Image
                  height={20}
                  width={20}
                  src={calendar_icon_tasks}
                  alt="calendar_icon_tasks"
                />
              )}
            </div>
          </section>
          <section className="mt-8">
            {activeTab === "list" && (
              <section className="flex flex-col gap-10">
                <List heading="In Progress" />
              </section>
            )}
            {activeTab === "board" && (
              <DndContext
                sensors={sensors}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
              >
                <section className="flex gap-10">
                  <SortableContext items={columnsId}>
                    {columns.map((col) => (
                      <Board
                        allTask={tasks}
                        key={col.id}
                        id={col.id}
                        title={col.title}
                      />
                    ))}
                  </SortableContext>
                </section>
              </DndContext>
            )}
            {activeTab === "calendar" && <Calendar />}
          </section>
        </section>
      </AuthWrapper>
    </main>
  );
};

export default Tasks;
