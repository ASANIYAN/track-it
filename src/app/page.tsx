"use client";

import DropdownHeading from "@/components/headings/dropdown-heading";
import ProjectCard from "@/components/project-card/project-card";
import AuthWrapper from "@/components/wrappers/auth-wrapper";

export default function Home() {

  return (
    <main className="">
      <AuthWrapper>
        <section className="mt-4 px-5">
          <DropdownHeading heading="Recent Project" />
          <section className="mt-4">
            <section className="flex flex-wrap gap-4">
              <ProjectCard title="App Development" subTitle="Development" />
              <ProjectCard title="App Development" subTitle="Development" />
              <ProjectCard title="App Development" subTitle="Development" />
              <ProjectCard title="App Development" subTitle="Development" />
              <ProjectCard title="App Development" subTitle="Development" />
              <ProjectCard title="App Development" subTitle="Development" />
              <ProjectCard title="App Development" subTitle="Development" />
              <ProjectCard title="App Development" subTitle="Development" />
            </section>
          </section>
        </section>
      </AuthWrapper>
    
    </main>
  )
}
