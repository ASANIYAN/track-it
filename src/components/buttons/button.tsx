"use client";

import { cn } from "@/lib/utils";
import { Button as UIButton } from "../ui/button";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProp = {
  children: ReactNode;
  handleClick: () => any;
};

const Button: React.FC<
  ButtonProp & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, handleClick, ...rest }) => {
  return (
    <UIButton
      onMouseDown={handleClick}
      className={cn(
        "bg-color3 text-white w-full text-lg font-medium text-center h-[48px] rounded-[5px] mt-5",
        rest.className
      )}
      {...rest}
    >
      {children}
    </UIButton>
  );
};

export default Button;
