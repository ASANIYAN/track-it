"use client";

import { useState } from 'react';

import { ForgetPasswordViews } from "@/types/types";
import InitialView from './initial-view';
import FinalView from './final-view';


const ForgotPassword = () => {
    const [view, setView] = useState<ForgetPasswordViews>("InitialView");


    return (
        <main>
            { view === 'InitialView' && <InitialView setView={setView} /> }
            { view === 'FinalView' && <FinalView setView={setView} /> }
        </main>
    );
}
 
export default ForgotPassword;