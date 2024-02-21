"use client";

import dynamic from "next/dynamic";
import { ReactElement, useEffect } from "react";

import { useCycle } from "framer-motion";

import { useUserStore } from "@/store/user-store";
import { useProjectStore } from "@/store/project-store";
import { useGetAllProject, useGetUser } from "@/utils/mutations/mutations";

const Desktop = dynamic(() => import("../navbar/desktop"), { ssr: false });
const Mobile = dynamic(() => import("../navbar/mobile"), { ssr: false });
const TopBar = dynamic(() => import("../top-bar/top-bar"), { ssr: false });

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

  const [open, cycleOpen] = useCycle(false, true);

  return (
    <section className="flex flex-nowrap h-screen">
      <Desktop />
      <Mobile open={open} />
      <section className="flex-1 overflow-y-auto pb-5">
        <TopBar cycleOpen={cycleOpen} />
        {children}
      </section>
    </section>
  );
};

export default AuthWrapper;
