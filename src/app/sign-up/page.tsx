"use client";

import { useState } from "react";

import InitialPage from "./initial-page";

import { SignUpViews } from "@/types/types";
import FinalPage from "./final-page";



const SignUp = () => {
    const [view, setView] = useState<SignUpViews>("SignUpView");


    return (
        <main>
            { view === 'SignUpView' && <InitialPage setView={setView} /> }
            { view === 'SetUpView' && <FinalPage /> }
        </main>
    );
}
 
export default SignUp;