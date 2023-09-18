"use client";

import { CustomCheckboxProps } from '@/types/types';

const CheckBox: React.FC<CustomCheckboxProps & React.InputHTMLAttributes<HTMLInputElement>> = ({ name, handleChange, ...rest }) => {
    return (
        <>
             <input
                className="focus:outline-none w-3.5 h-3.5 focus:text-color6 border bg-[#BDBDBD] border-[#BDBDBD] 
                checked:bg-color6 dark:bg-gray-700 dark:border-gray-600" 
                type={'checkbox'}
                name={name}
                onChange={handleChange}
                {...rest}
            />
        </>
    );
}
 
export default CheckBox;