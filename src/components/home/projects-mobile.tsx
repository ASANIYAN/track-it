import { Fragment } from "react";

import { ProjectsProps } from "@/types/types";

import ProjectCard from "../project-card/project-card";

const ProjectsMobile: React.FC<ProjectsProps> = ({ data }) => {
    return (
        <section className="flex flex-wrap gap-4 mt-4">
            {data.map((item) => {
                const {title, subTitle} = item;
                return <Fragment key={title}> <ProjectCard title={title} subTitle={subTitle} /> </Fragment>
            })}
        </section>
    );
}
 
export default ProjectsMobile;