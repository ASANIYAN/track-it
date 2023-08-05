"use client"

import { Metadata } from "next";

import * as yup from 'yup';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import UnauthHeading from "@/components/headings/unauth-heading";
import UnauthWrapper from "@/components/wrappers/unauth-wrapper";
import { CustomInput } from "@/components/inputs/custom-input";
import UnauthButton from "@/components/buttons/unauth-button";
import GoogleButton from "@/components/buttons/google-button";
import { LoginFormValues } from "@/types/types";


const metadata: Metadata = {
    title: 'Login',
    description: 'track-it login page',
}

const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});


const Login = () => {
    const method = useForm<LoginFormValues> ({
        resolver: yupResolver(validationSchema)
    });

    const { handleSubmit } = method;

    return (
        <main>
            <UnauthWrapper>
                <UnauthHeading heading={"Welcome back"} />
                <section className="max-w-[540px] mx-auto mt-10">
                    <CustomInput 
                        name="email" 
                        label="Email address" 
                        defaultType={"text"} 
                        method={method} 
                    />
                    <CustomInput 
                        name="password" 
                        defaultType="password" 
                        label="Password" 
                        method={method} 
                    />
                    <p className="text-[12px] font-normal text-color2 dark:text-darkColor3 -translate-y-5"> Forgot your password? </p>
                    
                    <UnauthButton handleSubmit={handleSubmit} > Log In </UnauthButton> 

                    <section className="flex items-center justify-center gap-2 mt-8">
                        <div className="border-t h-0.5 mt-1 w-full border-color4 dark:border-darkColor4"></div>
                        <span className="font-medium text-sm text-color5 dark:border-darkColor3"> or </span>
                        <div className="border-t h-0.5 mt-1 w-full border-color4 dark:border-darkColor4"></div>
                    </section>

                <GoogleButton />

                    <p 
                        className="text-color7 text-sm font-normal mt-5 text-center dark:text-white"
                    >
                        Don&#39;t have an account? <span className="text-color6 pl-1"> Sign up </span>  
                    </p>

                </section>
            </UnauthWrapper>
        </main>
    );
}
 
export default Login;