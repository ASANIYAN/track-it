"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type ButtonProp = {
  children: ReactNode;
  handleSubmit: UseFormHandleSubmit<any, undefined>;
  handleClick: SubmitHandler<any>;
};

const UnauthButton: React.FC<
  ButtonProp & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, handleSubmit, handleClick, ...rest }) => {
  return (
    <Button
      onMouseDown={handleSubmit(handleClick)}
      className={cn(
        "bg-color3 text-white w-full text-lg font-medium text-center h-[48px] rounded-[5px] mt-5",
        rest.className
      )}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default UnauthButton;
