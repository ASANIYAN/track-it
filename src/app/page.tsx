"use client";

import AuthWrapper from "@/components/wrappers/auth-wrapper";
import Projects from "@/components/home/projects";

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
        <section className="mt-4 px-5">

          <section>
            <Projects heading="Recent Project" data={recent} />
          </section>

          <section className="mt-10">
            <Projects heading="Favorites" data={favorite} />
          </section>


        </section>
      </AuthWrapper>
    
    </main>
  )
}
