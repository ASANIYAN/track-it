"use client";

import dynamic from "next/dynamic";
import { ReactElement } from "react";

import { useCycle } from "framer-motion";

const Desktop = dynamic(() => import("../navbar/desktop"), { ssr: false });
const Mobile = dynamic(() => import("../navbar/mobile"), { ssr: false });
const TopBar = dynamic(() => import("../top-bar/top-bar"), { ssr: false });

type AuthWrapperProps = {
  children: ReactElement | ReactElement[];
};

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
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
