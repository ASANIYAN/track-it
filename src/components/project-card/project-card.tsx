import Image from "next/image";

import { ProfileCircle } from "iconsax-react";

import { motion } from "framer-motion";

import { AllProject } from "@/types/types";
import ProjectCardOption from "./project-card-options";
import { useProjectStore } from "@/store/project-store";

type ProjectCardProps = {
  data: AllProject;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ data }) => {
  const { isSuccess } = useProjectStore();

  return (
    <>
      {isSuccess && (
        <motion.section
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: "100%",
            opacity: 1,
            transition: { duration: 0.6 },
          }}
          exit={{ opacity: 0, width: 0, transition: { duration: 0.5 } }}
          className="w-full sm:w-[250px] flex flex-col relative border border-color4 bg-white dark:border-darkColor4 dark:bg-darkColor2 gap-2.5 items-start rounded-[10px] py-3.5 px-3"
        >
          <section className="flex justify-between items-center w-full">
            <Image
              src={data?.image.url}
              width={24}
              height={24}
              alt={`${data?.name}-img`}
            />
            <ProjectCardOption data={data} />
          </section>
          <section className="truncate">
            <h4 className="text-color1 text-sm font-medium dark:text-white">
              {" "}
              {data?.name}{" "}
            </h4>
            <span className="mt-0.5 block text-[11px] font-normal text-color2 dark:text-darkColor3">
              {" "}
              {data?.description}
            </span>
          </section>
          <section className="space-y-2 w-full">
            <p className="text-color1 text-sm text-[11px] font-normal dark:text-white flex justify-between items-center">
              {" "}
              <span> Progress Task</span> <span> {data?.tasks.length} </span>{" "}
            </p>
            <p className="text-color1 text-sm text-[11px] font-normal dark:text-white flex justify-between items-center">
              {" "}
              <span> Complete Task</span> <span> {data?.tasks.length} </span>{" "}
            </p>
          </section>
          <section className="flex mt-2">
            {data?.users.map((_, index) => (
              <ProfileCircle
                key={index}
                size="20"
                color="#5b5c60"
                variant="Bold"
              />
            ))}
            {/* <ProfileCircle size="20" color="#5b5c60" variant="Bold"/>
                  <ProfileCircle size="20" color="#5b5c60" variant="Bold"/> */}
          </section>
        </motion.section>
      )}
    </>
  );
};

export default ProjectCard;
