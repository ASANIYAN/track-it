import { Fragment, useEffect } from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useCycle } from "framer-motion";

import ProjectCard from "../project-card/project-card";
import { useProjectStore } from "@/store/project-store";
import { AllProject, ProjectsProps } from "@/types/types";
import DropdownHeading from "../headings/dropdown-heading";

import "react-loading-skeleton/dist/skeleton.css";

const Projects: React.FC<ProjectsProps> = ({ heading, data }) => {
  const [open, cycleOpen] = useCycle(false, true);
  const { isLoading, isSuccess } = useProjectStore();

  return (
    <>
      <DropdownHeading heading={heading!} cycleOpen={cycleOpen} open={open} />
      {open && (
        <section className="flex flex-wrap gap-4 mt-4">
          {isLoading && <p> Loading.... </p>}
          {isSuccess &&
            data?.map((item: AllProject) => {
              const { _id } = item;
              return (
                <Fragment key={_id}>
                  {" "}
                  <ProjectCard data={item} />{" "}
                </Fragment>
              );
            })}
        </section>
      )}
    </>
  );
};

export default Projects;
