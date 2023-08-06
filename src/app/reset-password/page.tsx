"use client";

import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { CustomInput } from '@/components/inputs/custom-input';
import { ResetPasswordValues } from '@/types/types';
import UnauthHeading from "@/components/headings/unauth-heading";
import UnauthWrapper from "@/components/wrappers/unauth-wrapper";
import UnauthButton from '@/components/buttons/unauth-button';

import Link from 'next/link';

const validationSchema = yup.object().shape({
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Password is required'),
});



const InitialView = () => {

    const method = useForm<ResetPasswordValues> ({
        resolver: yupResolver(validationSchema)
    });

    const { handleSubmit } = method;
    
    const handleClick = (data: ResetPasswordValues) => {
        console.log(data);
    }

    return (
        <UnauthWrapper>
            <UnauthHeading heading={"Reset your password"} />
            <section className="max-w-[540px] mx-auto mt-10">
                <CustomInput 
                    name="password" 
                    label="New password"
                    defaultType={"password"}
                    method={method} 
                />
                <CustomInput 
                    name="confirmPassword" 
                    label="Confirm new password"
                    defaultType={"password"}
                    method={method} 
                />
                <UnauthButton handleSubmit={handleSubmit} handleClick={handleClick} > Continue </UnauthButton>
                <Link href={"/login"} className='flex justify-center text-color3 font-medium text-sm mt-8 text-center'> Back to sign in  </Link>
            </section>
        </UnauthWrapper>
    );
}
 
export default InitialView;