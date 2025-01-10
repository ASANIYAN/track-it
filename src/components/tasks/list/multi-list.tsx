"use client";

import Image from "next/image";
import { useState } from "react";
import { Add, ArrowDown2, ArrowUp2 } from "iconsax-react";
import ListItem from "./list-item";
import ThemeIconChanger from "@/utils/helpers/theme-icon-changer";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useSensors,
  useSensor,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const features = ["Due Date"];

type Task = {
  task: string;
  due: string;
  id: string;
  listId: string;
  originalListId?: string; // Track where the task came from
  originalDue?: string; // Track original due date
};

type ListData = {
  id: string;
  heading: string;
  items: Task[];
};

type MultiListProps = {
  initialLists: ListData[];
};

const MultiList: React.FC<MultiListProps> = ({ initialLists }) => {
  const [lists, setLists] = useState<ListData[]>(initialLists);
  const [activeItem, setActiveItem] = useState<Task | null>(null);
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({});

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeItem = lists
      .flatMap((list) => list.items)
      .find((item) => item.id === active.id);
    setActiveItem(activeItem || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeList = lists.find((list) =>
      list.items.some((item) => item.id === activeId)
    );
    const overList = lists.find((list) =>
      list.items.some((item) => item.id === overId)
    );

    if (!activeList || !overList) return;

    setLists((prevLists) => {
      if (activeList.id === overList.id) {
        const listIndex = prevLists.findIndex(
          (list) => list.id === activeList.id
        );
        const oldIndex = activeList.items.findIndex(
          (item) => item.id === activeId
        );
        const newIndex = activeList.items.findIndex(
          (item) => item.id === overId
        );

        const newItems = arrayMove(activeList.items, oldIndex, newIndex);
        const newLists = [...prevLists];
        newLists[listIndex] = {
          ...activeList,
          items: newItems,
        };
        return newLists;
      }

      const sourceListIndex = prevLists.findIndex(
        (list) => list.id === activeList.id
      );
      const destListIndex = prevLists.findIndex(
        (list) => list.id === overList.id
      );

      const newLists = [...prevLists];
      const [movedItem] = newLists[sourceListIndex].items.splice(
        newLists[sourceListIndex].items.findIndex(
          (item) => item.id === activeId
        ),
        1
      );

      const overIndex = newLists[destListIndex].items.findIndex(
        (item) => item.id === overId
      );

      movedItem.listId = overList.id;
      newLists[destListIndex].items.splice(overIndex, 0, movedItem);

      return newLists;
    });

    setActiveItem(null);
  };

  const handleCheckItem = (taskId: string, checked: boolean) => {
    setLists((prevLists) => {
      if (checked) {
        // Moving to Completed list
        const sourceList = prevLists.find((list) =>
          list.items.some((item) => item.id === taskId)
        );
        const completedList = prevLists.find(
          (list) => list.heading === "Completed"
        );

        if (!sourceList || !completedList) return prevLists;
        if (sourceList.id === completedList.id) return prevLists;

        const newLists = [...prevLists];
        const sourceListIndex = newLists.findIndex(
          (list) => list.id === sourceList.id
        );
        const taskIndex = newLists[sourceListIndex].items.findIndex(
          (item) => item.id === taskId
        );

        if (taskIndex === -1) return prevLists;

        const [movedTask] = newLists[sourceListIndex].items.splice(
          taskIndex,
          1
        );

        // Store original list info before moving to completed
        movedTask.originalListId = sourceList.id;
        movedTask.originalDue = movedTask.due;
        movedTask.listId = completedList.id;
        movedTask.due = "Done";

        const completedListIndex = newLists.findIndex(
          (list) => list.id === completedList.id
        );
        newLists[completedListIndex].items.unshift(movedTask);

        return newLists;
      } else {
        // Moving from Completed list back to original list
        const completedList = prevLists.find(
          (list) => list.heading === "Completed"
        );
        if (!completedList) return prevLists;

        const task = completedList.items.find((item) => item.id === taskId);
        if (!task) return prevLists;

        const targetListId = task.originalListId || prevLists[0].id; // Default to first list if no original list
        const targetList = prevLists.find((list) => list.id === targetListId);

        if (!targetList) return prevLists;

        const newLists = [...prevLists];
        const completedListIndex = newLists.findIndex(
          (list) => list.id === completedList.id
        );
        const taskIndex = newLists[completedListIndex].items.findIndex(
          (item) => item.id === taskId
        );

        if (taskIndex === -1) return prevLists;

        const [movedTask] = newLists[completedListIndex].items.splice(
          taskIndex,
          1
        );

        // Restore original values
        movedTask.listId = targetListId;
        movedTask.due = movedTask.originalDue || movedTask.due;
        delete movedTask.originalListId;
        delete movedTask.originalDue;

        const targetListIndex = newLists.findIndex(
          (list) => list.id === targetListId
        );
        newLists[targetListIndex].items.push(movedTask);

        return newLists;
      }
    });
  };

  const toggleList = (listId: string) => {
    setToggleStates((prev) => ({
      ...prev,
      [listId]: !prev[listId],
    }));
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col gap-4">
        {lists.map((list) => (
          <section
            key={list.id}
            className="w-full overflow-x-auto no-scrollbar"
          >
            <section className="dark:bg-darkColor2 py-3 w-full min-w-[1000px]">
              <section className="flex items-center justify-between pl-5 w-full">
                <section className="flex items-center gap-2.5 w-[270px]">
                  {toggleStates[list.id] ? (
                    <ThemeIconChanger
                      light={
                        <ArrowDown2
                          size="20"
                          color="#5b5c60"
                          variant="Bold"
                          onClick={() => toggleList(list.id)}
                          className="cursor-pointer"
                        />
                      }
                      dark={
                        <ArrowDown2
                          size="20"
                          color="#D5D6D7"
                          variant="Bold"
                          onClick={() => toggleList(list.id)}
                          className="cursor-pointer"
                        />
                      }
                    />
                  ) : (
                    <ThemeIconChanger
                      light={
                        <ArrowUp2
                          size="20"
                          color="#5b5c60"
                          variant="Bold"
                          onClick={() => toggleList(list.id)}
                          className="cursor-pointer"
                        />
                      }
                      dark={
                        <ArrowUp2
                          size="20"
                          color="#D5D6D7"
                          variant="Bold"
                          onClick={() => toggleList(list.id)}
                          className="cursor-pointer"
                        />
                      }
                    />
                  )}
                  <span className="text-sm font-medium">{list.heading}</span>
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
                <section className="flex items-center gap-10">
                  {features.map((feature, index) => (
                    <span className="w-[120px]" key={`${feature}-${index}`}>
                      {feature}
                    </span>
                  ))}
                </section>
              </section>
              <div className="border border-color4 dark:border-darkColor8 h-[1px] w-full my-2.5" />
              {toggleStates[list.id] && (
                <SortableContext
                  items={list.items.map((item) => item.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {list.items.map((item) => (
                    <ListItem
                      key={item.id}
                      data={item}
                      onCheck={(id, checked) => handleCheckItem(id, checked)}
                      isCompleted={list.heading === "Completed"}
                    />
                  ))}
                </SortableContext>
              )}
            </section>
          </section>
        ))}
        <section className="flex gap-1 items-center px-5 py-2.5 dark:bg-darkColor2 w-fit cursor-pointer">
          <Add
            width={10}
            height={10}
            className="text-color2 dark:text-darkColor7"
          />
          <span className="text-color8 dark:text-dark-color7 text-sm">
            Add task
          </span>
        </section>
      </div>
      <DragOverlay>
        {activeItem ? (
          <ListItem data={activeItem} onCheck={handleCheckItem} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default MultiList;
