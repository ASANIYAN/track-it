"use client";

import dynamic from "next/dynamic";
import { ReactElement, useEffect } from "react";

import { useCycle } from "framer-motion";

import Mobile from "../navbar/mobile";
import Desktop from "../navbar/desktop";
import TopBar from "../top-bar/top-bar";

import { useUserStore } from "@/store/user-store";
import { useProjectStore } from "@/store/project-store";
import { useGetAllProject, useGetUser } from "@/tanstack/mutations/mutations";

type AuthWrapperProps = {
  children: ReactElement | ReactElement[];
};

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
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
  useEffect(handleAddProjectInfoToStore, [setProjectWithUsers, projects]);
  useEffect(handleSetLoading, [loading, setIsLoading]);
  useEffect(handleSetSuccess, [success, setIsSuccess]);

  // effects for user data

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handleAddUserInfoToStore, [user, setUser]);
  useEffect(handleSetLoadingForUserData, [userIsLoading, setUserLoading]);
  useEffect(handleSetSuccessForUserData, [userFetchSuccess, setUserSuccess]);

  const [open, cycleOpen] = useCycle(false, true);

  return (
    <section className="flex flex-nowrap h-screen">
      <Desktop />
      <Mobile open={open} />
      <section className="flex-1 overflow-y-auto">
        <TopBar cycleOpen={cycleOpen} />
        <section className="bg-[#F9F9F9] dark:bg-[#222B32] pb-5 pt-4 min-h-[100vh]">
          {children}
        </section>
      </section>
    </section>
  );
};

export default AuthWrapper;
