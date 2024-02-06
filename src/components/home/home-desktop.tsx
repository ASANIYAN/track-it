import useGetAllProject from "@/utils/hooks/useGetAllProject";
import Projects from "./projects";
import WorkedOn from "./worked-on";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const recent = [
  { title: "App Development", subTitle: "Development" },
  { title: "Mobile", subTitle: "Development" },
];

const favorite = [
  { title: "App Development", subTitle: "Development" },
  { title: "Mobile", subTitle: "Development" },
];

const HomeDesktop = () => {
  return (
    <>
      <section>
        <Projects heading="Recent Project" data={recent} />
      </section>

      <section className="mt-10">
        <Projects heading="Favorites" data={favorite} />
      </section>

      <section className="mt-10">
        <WorkedOn heading="Worked on" />
      </section>
    </>
  );
};

export default HomeDesktop;
