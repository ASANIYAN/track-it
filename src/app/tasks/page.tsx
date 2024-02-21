"use client";

import { useState } from "react";

import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

import List from "@/components/tasks/list";
import AuthWrapper from "@/components/wrappers/auth-wrapper";

import list_icon from "../../../public/assets/icons/list_icon.svg";
import list_icon_active from "../../../public/assets/icons/list_icon_active.svg";
import board_icon from "../../../public/assets/icons/board_icon.svg";
import board_icon_active from "../../../public/assets/icons/board_icon_active.svg";
import calendar_icon_tasks from "../../../public/assets/icons/calendar_tasks_icon.svg";
import calendar_icon_tasks_active from "../../../public/assets/icons/calendar_tasks_icon_active.svg";
import Image from "next/image";

type TabRoute = "list" | "board" | "calendar";

const Tasks = () => {
  const [activeTab, setActiveTab] = useState<TabRoute>("list");

  const handleSetActiveTab = (tabValue: TabRoute) => () =>
    setActiveTab(tabValue);

  return (
    <main>
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
          </section>
        </section>
      </AuthWrapper>
    </main>
  );
};

export default Tasks;
