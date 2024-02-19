"use client";

import { Add, ArrowDown2, ArrowUp2 } from "iconsax-react";

import ThemeIconChanger from "@/utils/helpers/theme-icon-changer";
import { useState } from "react";
import Image from "next/image";

const features = ["Tag", "Properties", "Due Date"];

const List = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const handleClick = () => {};
  return (
    <section>
      <section className="flex items-center gap-2.5">
        {toggle ? (
          <ThemeIconChanger
            light={<ArrowDown2 size="20" color="#5b5c60" variant="Bold" />}
            dark={<ArrowDown2 size="20" color="#D5D6D7" variant="Bold" />}
          />
        ) : (
          <ThemeIconChanger
            light={<ArrowUp2 size="20" color="#5b5c60" variant="Bold" />}
            dark={<ArrowUp2 size="20" color="#D5D6D7" variant="Bold" />}
          />
        )}
        <span className="text-sm font-medium"> In Progress </span>
        <Add
          width={10}
          height={10}
          className="text-color2 dark:text-darkColor7"
        />
        <Image
          width={16}
          height={16}
          src={"/assets/icons/ellipsis.svg"}
          alt="ellipsis"
          className="cursor-pointer"
          onClick={handleClick}
        />
      </section>
      <section className="flex items-center gap-10">
        {features.map((feature, index) => (
          <span key={`${feature}-${index}`}>{feature}</span>
        ))}
      </section>
    </section>
  );
};

export default List;
