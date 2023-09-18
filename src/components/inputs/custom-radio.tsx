import { CustomRadioProps } from "@/types/types";

import "./inputs.css";

const CustomRadio: React.FC<CustomRadioProps & React.InputHTMLAttributes<HTMLInputElement>> = ({ method, name, label, ...rest }) => {
    const {
        formState: { errors },
        register,
      } = method;


    return (
        <section className="flex items-center mb-2.5 radio-input">
            <input 
            {...register(name)}
            name={name}
            className="appearance-none cursor-pointer opacity-0 p-1.5 translate-x-4 -translate-y-2 rounded-full border-2"
            type="radio"
            value={label}
            {...rest}
            />
            <label className="text-sm font-medium text-color7 dark:text-white"> {label} </label>
        </section>
    );
}
 
export default CustomRadio;