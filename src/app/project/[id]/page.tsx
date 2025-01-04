"use client";

import HomeDesktop from "@/components/home/home-desktop";
import HomeMobile from "@/components/home/home-mobile";
import AuthWrapper from "@/components/wrappers/auth-wrapper";

const Project = ({ params }: { params: { id: string } }) => {
  console.log(params.id, "project id");

  return (
    <AuthWrapper>
      <section className="sm:hidden mt-6 px-1 xs:px-5">
        <HomeMobile />
      </section>
      <section className="hidden sm:block mt-4 px-1 sm:px-5">
        <HomeDesktop />
      </section>
    </AuthWrapper>
  );
};

export default Project;
