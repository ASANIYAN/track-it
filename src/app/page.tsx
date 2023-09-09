"use client";

import AuthWrapper from "@/components/wrappers/auth-wrapper";
import Projects from "@/components/home/projects";
import WorkedOn from "@/components/home/worked-on";
import HomeMobile from "@/components/home/home-mobile";

export default function Home() {

  const recent = [
    {title: "App Development", subTitle: "Development"},
    {title: "Mobile", subTitle: "Development"}
  ];

  const favorite = [
    {title: "App Development", subTitle: "Development"},
    {title: "Mobile", subTitle: "Development"}
  ];

  return (
    <main className="">
      <AuthWrapper>
        <section className="sm:hidden mt-4 px-1 xs:px-5">
          <HomeMobile />
        </section>
        <section className="hidden sm:block mt-4 px-1 sm:px-5">

          <section>
            <Projects heading="Recent Project" data={recent} />
          </section>

          <section className="mt-10">
            <Projects heading="Favorites" data={favorite} />
          </section>

          <section className="mt-10">
            <WorkedOn heading="Worked on" />
          </section>

        </section>
      </AuthWrapper>
    
    </main>
  )
}
