"use client";

import { useState } from "react";

import { ForgetPasswordViews } from "@/types/types";
import InitialView from "./initial-view";
import FinalView from "./final-view";

const ForgotPassword = () => {
  const [view, setView] = useState<ForgetPasswordViews>("InitialView");
  const [email, setEmail] = useState<string>("");

  const handleSetViewAndEmail = (view: ForgetPasswordViews, email: string) => {
    setView(view);
    setEmail(email);
  };

  return (
    <main>
      {view === "InitialView" && (
        <InitialView handleSetViewAndEmail={handleSetViewAndEmail} />
      )}
      {view === "FinalView" && <FinalView email={email} />}
    </main>
  );
};

export default ForgotPassword;
