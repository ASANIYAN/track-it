"use client";

import Image from "next/image";
import { useState } from "react";

import AddButton from "../buttons/add-button";
import SearchBar from "../search-bar/search-bar";

import { motion } from "framer-motion";
import {
  ArrowDown2,
  ArrowUp2,
  Home,
  People,
  Setting2,
  TickCircle,
  Calendar,
} from "iconsax-react";

import "./navbar.css";
import Link from "next/link";
import { useProjectStore } from "@/store/project-store";
import { useProjectIDStore } from "@/store/selected-project-store";

const Desktop = () => {
  const { projectsWithUsers, isSuccess } = useProjectStore();
  const [dropDown, setDropDown] = useState<boolean>(false);

  const handleDropDown = () => {
    setDropDown((prevState) => !prevState);
  };

  const { selectedProjectId } = useProjectIDStore();

  const navigation = [
    {
      title: "Home",
      path: "/",
      icon: <Home size="18" className="dark:text-white text-color2" />,
    },
    {
      title: "My Tasks",
      path: `tasks/${selectedProjectId}`,
      icon: <TickCircle size="18" className="dark:text-white text-color2" />,
    },
    {
      title: "My Plan",
      path: "/",
      icon: <Calendar size="18" className="dark:text-white text-color2" />,
    },
    {
      title: "People",
      path: "/",
      icon: <People size="18" className="dark:text-white text-color2" />,
    },
    {
      title: "Setting",
      path: "/setting",
      icon: <Setting2 size="18" className="dark:text-white text-color2" />,
    },
  ];

  const showIcon = () => {
    return dropDown ? (
      <ArrowUp2 size="18" color="#848588" className="cursor-pointer" />
    ) : (
      <ArrowDown2 size="18" className="cursor-pointer" color="#848588" />
    );
  };

  return (
    <motion.aside
      className={`hidden md:block bg-white dark:bg-darkColor5 shadow-one dark:shadow-darkOne w-[240px] overflow-x-hidden overflow-y-auto h-full py-3`}
    >
      <section className="px-2">
        <nav className="pt-6">
          <ul className="flex flex-col gap-2">
            {navigation.map((item, index) => (
              <Link href={item.path} key={index}>
                <li
                  className={`text-color2 hover:text-white cursor-pointer dark:text-darkColor3 text-sm font-normal pl-3 
                                py-2 w-[220px] hover:bg-color6 rounded-[6px] flex gap-2.5 items-center`}
                >
                  {item.icon} <span> {item.title} </span>
                </li>
              </Link>
            ))}
          </ul>
        </nav>
        <section className="mb-5 px-3">
          <section
            className="flex justify-between mt-5 items-center cursor-pointer"
            onClick={handleDropDown}
          >
            <h4 className="font-medium text-sm text-color9"> Favorites </h4>
            {showIcon()}
          </section>
          {isSuccess && (
            <>
              {dropDown &&
                projectsWithUsers.map((project) => (
                  <section key={project._id} className="mt-2.5 space-y-3.5">
                    <p className="flex gap-2.5 items-center lg:cursor-pointer">
                      <Image
                        width={20}
                        height={20}
                        src={project.image.url}
                        alt={`${project.name}-img`}
                      />
                      <span className="text-color7 dark:text-white text-sm font-normal">
                        {project.name}
                      </span>
                    </p>
                  </section>
                ))}
            </>
          )}
        </section>
      </section>

      <div className="border-b h-0.5 border-color4 dark:border-darkColor4" />

      <section className="mt-5 px-2 flex items-center gap-4">
        <SearchBar />
        <AddButton />
      </section>

      <section className="px-3 mt-5">
        <h4 className="font-medium text-sm text-color9"> Projects </h4>
        {isSuccess &&
          projectsWithUsers.map((project) => (
            <section key={project._id} className="mt-2.5 space-y-3.5">
              <p className="flex gap-2.5 items-center lg:cursor-pointer">
                <Image
                  width={20}
                  height={20}
                  src={project.image.url}
                  alt={`${project.name}-img`}
                />
                <span className="text-color7 dark:text-white text-sm font-normal">
                  {project.name}
                </span>
              </p>
            </section>
          ))}
      </section>
    </motion.aside>
  );
};

export default Desktop;
