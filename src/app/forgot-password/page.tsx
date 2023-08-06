"use client";

import { useState } from 'react';



import { ForgetPasswordViews, ForgotPasswordFormValues } from "@/types/types";
import InitialView from './initial-view';


const ForgotPassword = () => {
    const [view, setView] = useState<ForgetPasswordViews>("InitialView");


    return (
        <main>
            { view === 'InitialView' && <InitialView /> }
            { view === 'FinalView' && <InitialView /> }
        </main>
    );
}
 
export default ForgotPassword;