import { Fragment, useEffect } from "react";

import { useCycle } from "framer-motion";

import { AllProject, ProjectsProps } from "@/types/types";
import DropdownHeading from "../headings/dropdown-heading";
import ProjectCard from "../project-card/project-card";
import useGetAllProject from "@/utils/hooks/useGetAllProject";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useProjectStore } from "@/store/project-store";

const Projects: React.FC<ProjectsProps> = ({ heading, data }) => {
  const [open, cycleOpen] = useCycle(false, true);
  const { isLoading, isSuccess } = useProjectStore();

  // console.log(projects.projectsWithUsers, "content from getRequest");

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
