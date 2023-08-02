"use client"

import { Metadata } from "next";

import UnauthHeading from "@/components/headings/unauth-heading";

import * as yup from 'yup';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomInput } from "@/components/inputs/custom-input";
import Image from "next/image";


export type LoginFormValues = {
    email: string,
    password: string
}

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

    return (
        <section className="max-w-[740px] mx-3 xs:mx-auto mt-10 px-2 md:px-0 py-5 rounded-md bg-white shadow-md">
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
                <p className="text-[12px] font-normal text-color2 -translate-y-5"> Forgot your password? </p>
                
                <button className="bg-color3 text-white w-full text-lg font-medium text-center h-[48px] rounded-[5px] mt-5"> Log In </button>

                <section className="flex items-center justify-center gap-2 mt-8">
                    <div className="border-t h-0.5 mt-1 w-full border-color4"></div>
                    <span className="font-medium text-sm text-color5"> or </span>
                    <div className="border-t h-0.5 mt-1 w-full border-color4"></div>
                </section>

                <button className="border border-color4 w-full h-[48px] flex justify-center items-center gap-2 rounded-[5px] mt-8">  
                    <Image 
                        width={20}
                        height={20}
                        src={"/images/google-img.png"}
                        alt="google-image"
                    />
                    Continue with Google
                </button>

                <p className="text-color7 text-sm font-normal mt-5 text-center"> Don&#39;t have an account? <span className="text-color6 pl-1"> Sign up </span>  </p>

            </section>
        </section>
    );
}
 
export default Login;