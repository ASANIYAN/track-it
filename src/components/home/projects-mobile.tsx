import { Fragment } from "react";

import { ProjectsProps } from "@/types/types";

import ProjectCard from "../project-card/project-card";
import { useProjectStore } from "@/store/project-store";

const ProjectsMobile: React.FC<ProjectsProps> = ({ data }) => {
  const { isLoading, isSuccess } = useProjectStore();
  return (
    <section className="flex flex-wrap gap-4 mt-4">
      {isLoading && <p> Loading.... </p>}
      {isSuccess &&
        data?.map((item) => {
          const { _id } = item;
          return (
            <Fragment key={_id}>
              {" "}
              <ProjectCard data={item} />{" "}
            </Fragment>
          );
        })}
    </section>
  );
};

export default ProjectsMobile;
