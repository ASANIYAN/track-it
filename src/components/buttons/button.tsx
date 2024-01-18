"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProp = {
  children: ReactNode;
  handleClick: () => any;
};

const Button: React.FC<
  ButtonProp & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, handleClick, ...rest }) => {
  return (
    <button
      onClick={handleClick}
      className="bg-color3 text-white w-full text-lg font-medium text-center h-[48px] rounded-[5px] mt-5"
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
