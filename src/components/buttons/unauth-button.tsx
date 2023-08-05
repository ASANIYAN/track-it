import { ReactNode } from "react";

import { SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';

type ButtonProp = {
    children: ReactNode,
    handleSubmit: UseFormHandleSubmit<any, undefined>,
}

const UnauthButton:React.FC<ButtonProp> = ({ children, handleSubmit }) => {

    const handleClick: SubmitHandler<any> = (data) => {
        console.log(data);
        
    }

    return (
        <button onClick={handleSubmit(handleClick)} className="bg-color3 text-white w-full text-lg font-medium text-center h-[48px] rounded-[5px] mt-5">
            { children }
        </button>
    );
}
 
export default UnauthButton;