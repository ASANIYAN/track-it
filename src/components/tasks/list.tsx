"use client";

import Image from "next/image";
import { useState } from "react";

import { Add, ArrowDown2, ArrowUp2 } from "iconsax-react";

import ListItem from "./list-item";
import ThemeIconChanger from "@/utils/helpers/theme-icon-changer";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

const features = ["Tag", "Properties", "Due Date"];

type ListProps = {
  heading: string;
};

const List: React.FC<ListProps> = ({ heading }) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const [items, setItems] = useState([
    {
      task: "Customer Experience Insight",
      tag: "air",
      color: "#000",
      properties: "Web Design",
      due: "Tuesday",
      id: 1,
    },
    {
      task: "Work Insight",
      tag: "work",
      color: "#056278",
      properties: "Mobile Design",
      due: "Thursday",
      id: 2,
    },
    {
      task: "Jobs Insight",
      tag: "jobs",
      color: "#123678",
      properties: "App Design",
      due: "Friday",
      id: 3,
    },
  ]);

  // const reorderList = (e: DragEndEvent) => {
  //   if (!e.over) return;

  //   if (e.active.id !== e.over.id) {
  //     setItems((list) => {
  //       const oldIdx = list.indexOf(e.active.id.toString());
  //       const newIdx = list.indexOf(e.over!.id.toString());
  //       return arrayMove(list, oldIdx, newIdx);
  //     });
  //   }
  // };

  const reorderList = (e: DragEndEvent) => {
    if (!e.over) return;

    if (e.active.id !== e.over.id) {
      setItems((items) => {
        const oldIdx = items.findIndex((item) => item.id === e.active.id);
        const newIdx = items.findIndex((item) => item.id === e.over!.id);

        // Assuming you have an 'arrayMove' function available:
        const reorderedItems = arrayMove(items, oldIdx, newIdx);

        // OR, alternatively, using array manipulation:
        // const [removedItem] = items.splice(oldIdx, 1);
        // items.splice(newIdx, 0, removedItem);

        return reorderedItems;
      });
    }
  };

  const handleToggle = () => setToggle((toggle) => !toggle);

  return (
    <DndContext onDragEnd={reorderList}>
      <section className="dark:bg-darkColor2 py-3">
        <section className="flex items-center justify-between pl-5">
          <section className="flex items-center gap-2.5 w-[270px]">
            {toggle ? (
              <ThemeIconChanger
                light={
                  <ArrowDown2
                    size="20"
                    color="#5b5c60"
                    variant="Bold"
                    onClick={handleToggle}
                    className="cursor-pointer"
                  />
                }
                dark={
                  <ArrowDown2
                    size="20"
                    color="#D5D6D7"
                    variant="Bold"
                    onClick={handleToggle}
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
                    onClick={handleToggle}
                    className="cursor-pointer"
                  />
                }
                dark={
                  <ArrowUp2
                    size="20"
                    color="#D5D6D7"
                    variant="Bold"
                    onClick={handleToggle}
                    className="cursor-pointer"
                  />
                }
              />
            )}
            <span className="text-sm font-medium"> {heading} </span>
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
          <section className="flex items-center gap-10">
            {features.map((feature, index) => (
              <span className="w-[120px]" key={`${feature}-${index}`}>
                {feature}
              </span>
            ))}
          </section>
        </section>
        <div className="border border-color4  dark:border-darkColor8 h-[1px] w-full my-2.5" />
        {toggle && (
          <SortableContext items={items}>
            {items.map((item, index) => (
              <ListItem key={`${item.id}-${index}`} data={item} />
            ))}
          </SortableContext>
        )}
      </section>
      <section className="flex gap-1 items-center px-5 py-2.5 dark:bg-darkColor2 w-fit cursor-pointer">
        <Add
          width={10}
          height={10}
          className="text-color2 dark:text-darkColor7"
        />
        <span className="text-color8 dark:text-dark-color7 text-base">
          {" "}
          Add task{" "}
        </span>
      </section>
    </DndContext>
  );
};

export default List;
