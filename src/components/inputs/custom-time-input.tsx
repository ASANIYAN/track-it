"use client";

import { UseFormReturn } from "react-hook-form";
import { ErrorMsg } from "../alerts/error-msg";

type CustomTimeInputProps = {
    name: string,
    method: UseFormReturn<any>,
    label?: string,
}

const CustomTimeInput: React.FC<CustomTimeInputProps & React.InputHTMLAttributes<HTMLInputElement>> = ({ method, name, label, ...rest }) => {
    
    const {
        formState: { errors },
        register,
      } = method;

    return (
        <>
          <section className="flex items-center custom-time-input">
            <label className="text-color11 text-sm font-normal dark:text-darkColor3"> {label} </label>
            <input
            {...register(name)}
             className={`focus:outline-none text-color1 dark:text-white border  border-color4 w-full block -translate-x-10`}
             name={name}
             type={"time"}
             {...rest}
            />
            { errors && <ErrorMsg msg={errors[name]?.message ? errors[name]?.message : ""} /> }
          </section>
        </>
    );
}
 
export default CustomTimeInput;