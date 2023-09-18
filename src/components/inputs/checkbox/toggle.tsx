import { CustomCheckboxProps } from "@/types/types";

const Toggle: React.FC<CustomCheckboxProps & React.InputHTMLAttributes<HTMLInputElement>> = ({ name, handleChange, ...rest }) => {
    return (
        <label className="relative inline-flex w-fit items-center cursor-pointer">
            <input 
                type="checkbox" 
                name={name} 
                className="sr-only peer" 
                onChange={handleChange}
                {...rest}
            />
            <div 
                className="w-8 h-[18px] bg-color10 peer-focus:outline-none rounded-full peer dark:bg-bg-darkColor2 peer-checked:after:translate-x-full 
                peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-gray-300 
                after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-color6"
            >
            </div>
        </label>

    );
}
 
export default Toggle;