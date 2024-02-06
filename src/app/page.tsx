"use client";

import AuthWrapper from "@/components/wrappers/auth-wrapper";

import HomeDesktop from "@/components/home/home-desktop";
import HomeMobile from "@/components/home/home-mobile";
import useGetAllProject from "@/utils/hooks/useGetAllProject";
import { useProjectStore } from "@/store/project-store";
import { useEffect } from "react";

export default function Home() {
  const {
    data: projects,
    error,
    isLoading: loading,
    isSuccess: success,
  } = useGetAllProject();
  const { setProjectWithUsers, setIsLoading, setIsSuccess } = useProjectStore();

  const handleAddProjectInfoToStore = () => {
    if (projects) {
      setProjectWithUsers(projects?.projectsWithUsers);
    }
  };
  const handleSetLoading = () => {
    setIsLoading(loading);
  };
  const handleSetSuccess = () => {
    setIsSuccess(success);
  };
  useEffect(handleAddProjectInfoToStore, [projects, setProjectWithUsers]);
  useEffect(handleSetLoading, [loading, setIsLoading]);
  useEffect(handleSetSuccess, [success, setIsSuccess]);

  return (
    <main className="">
      <AuthWrapper>
        <section className="sm:hidden mt-6 px-1 xs:px-5">
          <HomeMobile />
        </section>
        <section className="hidden sm:block mt-4 px-1 sm:px-5">
          <HomeDesktop />
        </section>
      </AuthWrapper>
    </main>
  );
}
