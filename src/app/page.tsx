"use client";

import { useEffect } from "react";

import { useUserStore } from "@/store/user-store";
import { useProjectStore } from "@/store/project-store";

import HomeMobile from "@/components/home/home-mobile";
import HomeDesktop from "@/components/home/home-desktop";
import AuthWrapper from "@/components/wrappers/auth-wrapper";

import { useGetAllProject, useGetUser } from "@/utils/mutations/mutations";

export default function Home() {
  // request to get all projects
  const {
    data: projects,
    error,
    isLoading: loading,
    isSuccess: success,
  } = useGetAllProject();

  // request to get user
  const {
    data: user,
    error: userEndpointError,
    isLoading: userIsLoading,
    isSuccess: userFetchSuccess,
  } = useGetUser();

  // zustand project store
  const { setProjectWithUsers, setIsLoading, setIsSuccess } = useProjectStore();

  // zustand user store
  const {
    setUser,
    setIsLoading: setUserLoading,
    setIsSuccess: setUserSuccess,
  } = useUserStore();

  // project functions
  const handleAddProjectInfoToStore = () => {
    if (success) {
      setProjectWithUsers(projects?.projectsWithUsers);
    }
  };

  const handleSetLoading = () => {
    setIsLoading(loading);
  };
  const handleSetSuccess = () => {
    setIsSuccess(success);
  };

  // user functions
  const handleAddUserInfoToStore = () => {
    if (userFetchSuccess) {
      setUser(user?.user);
    }
  };

  const handleSetLoadingForUserData = () => {
    setUserLoading(userIsLoading);
  };
  const handleSetSuccessForUserData = () => {
    setUserSuccess(userFetchSuccess);
  };

  //effects for project data

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handleAddProjectInfoToStore, [success, setProjectWithUsers]);
  useEffect(handleSetLoading, [loading, setIsLoading]);
  useEffect(handleSetSuccess, [success, setIsSuccess]);

  // effects for user data

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handleAddUserInfoToStore, [userFetchSuccess, setUser]);
  useEffect(handleSetLoadingForUserData, [userIsLoading, setUserLoading]);
  useEffect(handleSetSuccessForUserData, [userFetchSuccess, setUserSuccess]);

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
