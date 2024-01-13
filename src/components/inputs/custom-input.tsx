"use client";

import { useState } from "react";
import { Eye, EyeSlash } from "iconsax-react";

import { CustomInputProps } from "@/types/types";
import { ErrorMsg } from "../alerts/error-msg";
import { InputWrap } from "./input-wrap";

export const CustomInput: React.FC<
  CustomInputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({ method, name, label, defaultType, ...rest }) => {
  const [isPassword, setIsPassword] = useState<string>(defaultType);
  const {
    formState: { errors },
    register,
  } = method;

  const togglePassword = () => {
    setIsPassword((prevInputType) =>
      prevInputType === "text" ? "password" : "text"
    );
  };

  return (
    <>
      <InputWrap>
        <label> {label} </label>
        <input
          {...register(name)}
          className={`focus:outline-none dark:text-darkColor3 border ${
            errors[name] ? " border-error" : "border-color4"
          }`}
          name={name}
          type={isPassword}
          {...rest}
        />
        {defaultType === "password" && (
          <span
            onClick={togglePassword}
            className="absolute cursor-pointer translate-y-[42px] -translate-x-3 right-0"
          >
            {isPassword === "password" ? (
              <Eye color="#848588" />
            ) : (
              <EyeSlash color="#848588" />
            )}
          </span>
        )}
        {errors && (
          <ErrorMsg msg={errors[name]?.message ? errors[name]?.message : ""} />
        )}
      </InputWrap>
    </>
  );
};
