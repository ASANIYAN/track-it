"use client";

import { useState } from "react";

import List from "@/components/tasks/list";
import AuthWrapper from "@/components/wrappers/auth-wrapper";

type TabRoute = "list" | "board" | "calendar";

const Tasks = () => {
  const [activeTab, setActiveTab] = useState<TabRoute>("list");

  return (
    <main>
      <AuthWrapper>
        <section className="px-1 sm:px-5 mt-4">
          <section>{activeTab === "list" && <List />}</section>
        </section>
      </AuthWrapper>
    </main>
  );
};

export default Tasks;
