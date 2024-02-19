"use client";

import { useState } from "react";

import List from "@/components/tasks/list";

type TabRoute = "list" | "board" | "calendar";

const Tasks = () => {
  const [activeTab, setActiveTab] = useState<TabRoute>("list");

  return <section>{activeTab === "list" && <List />}</section>;
};

export default Tasks;
