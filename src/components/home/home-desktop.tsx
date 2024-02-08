import useGetAllProject from "@/utils/hooks/useGetAllProject";
import Projects from "./projects";
import WorkedOn from "./worked-on";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useProjectStore } from "@/store/project-store";

const HomeDesktop = () => {
  const { projectsWithUsers } = useProjectStore();
  const favourites = projectsWithUsers.filter((obj) => obj.favourite === true);

  return (
    <>
      <section>
        <Projects heading="Recent Project" data={projectsWithUsers} />
      </section>

      <section className="mt-10">
        <Projects heading="Favourites" data={favourites} />
      </section>

      <section className="mt-10">
        <WorkedOn heading="Worked on" />
      </section>
    </>
  );
};

export default HomeDesktop;
