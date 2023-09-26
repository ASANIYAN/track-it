"use client";

import { Controller, UseFormReturn } from "react-hook-form";

import { InputWrap } from "./input-wrap";
import { ErrorMsg } from "../alerts/error-msg";
import { Fragment } from "react";

type Option = {
    label: string,
    value: string
};

type CustomSelectProps = {
    name: string,
    method: UseFormReturn<any>,
    label?: string,
    options: Option[],
}

export const CustomSelect: React.FC<CustomSelectProps & React.SelectHTMLAttributes<HTMLSelectElement>> = ({ name, method, options, label, ...rest }) => {

    const {
      control,
      formState: { errors },
    } = method;
  
    return (
      <>
        <InputWrap>
          <label> { label }</label>
          <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <select 
                  {...field}
                  {...rest}
                  className={`focus:outline-none bg-white text-sm dark:bg-darkColor2 dark:text-white border text-color1 font-normal border-color4`}
              >
                { options.map((option) => (
                  <Fragment key={option.label}>
                      <option className="bg-transparent" value={option.value}>{option.label} </option>
                  </Fragment>
                ))}
              </select>
              )}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-5 top-[45%]" width="16" height="16"      viewBox="0 0 16 16" fill="none"
          >
            <path d="M7.64637 10.9797L2.18681 5.52018C1.87182 5.2052 2.0949 4.66663 2.54036 4.66663H13.4595C13.9049 4.66663 14.128 5.2052 13.813 5.52018L8.35347 10.9797C8.15821 11.175 7.84163 11.175 7.64637 10.9797Z" fill="#848588"/>
          </svg>
          { errors[name] && <ErrorMsg msg={errors[name]?.message} /> }
        </InputWrap>
      </>
    );
  };