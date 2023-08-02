"use client"

import { useState } from 'react';

import { UseFormReturn } from 'react-hook-form';

import { ErrorMsg } from "../alerts/error-msg";
import { InputWrap } from "./input-wrap";

import { Eye, EyeSlash } from 'iconsax-react';




type CustomInputProps = {
    name: string,
    label: string,
    defaultType: string,
    method: UseFormReturn<any>,
}

export const CustomInput: React.FC<CustomInputProps & React.InputHTMLAttributes<HTMLInputElement>> = ({ method, name, label, defaultType, ...rest }) => {
    const [isPassword, setIsPassword] = useState<string>(defaultType); 
    const {
      formState: { errors },
      register,
    } = method;

    const togglePassword = () => {
        setIsPassword((prevInputType) => (prevInputType === 'text' ? 'password' : 'text'));
    };

    return (
        <>
          <InputWrap>
            <label> {label} </label>
            <input
            {...register(name)}
             className="focus:outline-none"
             name={name}
             type={isPassword}
             {...rest}
            />
            { defaultType === 'password' && (
                <span 
                    onClick={togglePassword} 
                    className='absolute cursor-pointer top-[50%] -translate-x-3 right-0'
                > 
                    {isPassword === "password" ? <Eye color="#848588"/> : <EyeSlash color="#848588"/> }
                </span>
            )}
            { errors && <ErrorMsg msg={errors[name]?.message ? errors[name]?.message : ""} /> }
          </InputWrap>
        </>
      );
}