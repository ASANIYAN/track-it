import { ReactNode } from "react";

type ButtonProp = {
    children: ReactNode
}

const UnauthButton:React.FC<ButtonProp> = ({ children }) => {
    return (
        <button className="bg-color3 text-white w-full text-lg font-medium text-center h-[48px] rounded-[5px] mt-5">
            { children }
        </button>
    );
}
 
export default UnauthButton;