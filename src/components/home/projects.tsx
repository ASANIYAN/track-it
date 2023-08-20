import { Fragment } from "react";

import { useCycle } from "framer-motion";

import { ProjectsProps } from "@/types/types";
import DropdownHeading from "../headings/dropdown-heading";
import ProjectCard from "../project-card/project-card";



const Projects: React.FC<ProjectsProps> = ({heading, data}) => {
    const [open, cycleOpen] = useCycle(false, true);

    return (
        <>
            <DropdownHeading heading={heading} cycleOpen={cycleOpen} open={open} />
            { open &&
                <section className="flex flex-wrap gap-4 mt-4">
                    {data.map((item) => {
                        const {title, subTitle} = item;
                        return <Fragment key={title}> <ProjectCard title={title} subTitle={subTitle} /> </Fragment>
                    })}
                </section>
            }
        </>
    );
}
 
export default Projects;