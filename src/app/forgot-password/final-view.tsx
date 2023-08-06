"use client";

import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { CustomInput } from '@/components/inputs/custom-input';
import { ForgotPasswordFormValues } from "@/types/types";
import UnauthHeading from "@/components/headings/unauth-heading";
import UnauthWrapper from "@/components/wrappers/unauth-wrapper";
import UnauthButton from '@/components/buttons/unauth-button';
import Link from 'next/link';

const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
});

const InitialView = () => {
    const method = useForm<ForgotPasswordFormValues> ({
        resolver: yupResolver(validationSchema)
    });

    const { handleSubmit } = method;
    
    const handleClick = (data: ForgotPasswordFormValues) => {
        console.log(data);   
    }

    return (
        <UnauthWrapper>
            <UnauthHeading heading={"Forgot your password?"} />
            <section className="max-w-[540px] mx-auto mt-10">
                <p 
                    className='text-base font-normal text-color1 dark:text-darkColor3'
                > 
                    Instructions for resetting your password have been sent to 
                    <span className='text-color7 font-semibold dark:text-white'> example@gmail.com </span> 
                </p>
                <UnauthButton handleSubmit={handleSubmit} handleClick={handleClick} > Continue </UnauthButton>
                <Link href={"/login"} className='flex justify-center text-color3 font-medium text-sm mt-8 text-center'> Back to sign in  </Link>
            </section>
        </UnauthWrapper>
    );
}
 
export default InitialView;