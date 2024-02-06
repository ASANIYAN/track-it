import { useState } from "react";

import Tab from "../tab/tab";

import ProjectsMobile from "./projects-mobile";
import WorkedOnMobile from "./worked-on-mobile";
import { useProjectStore } from "@/store/project-store";

type tabOptions = "recent" | "favorites" | "worked";

const recent = [
  { title: "App Development", subTitle: "Development" },
  { title: "Mobile", subTitle: "Development" },
];

const favorite = [
  { title: "App Development", subTitle: "Development" },
  { title: "Mobile", subTitle: "Development" },
];

const tabs = [
  { name: "Recent", alias: "recent" },
  { name: "Favorites", alias: "favorites" },
  { name: "Worked", alias: "worked" },
];

const HomeMobile = () => {
  const [activeTab, setActiveTab] = useState<tabOptions>("recent");
  const { projectsWithUsers } = useProjectStore();

  return (
    <section className="px-1">
      <Tab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === tabs[0].alias && (
        <ProjectsMobile data={projectsWithUsers} />
      )}
      {activeTab === tabs[1].alias && (
        <ProjectsMobile data={projectsWithUsers} />
      )}
      {activeTab === tabs[2].alias && <WorkedOnMobile />}
    </section>
  );
};

export default HomeMobile;
