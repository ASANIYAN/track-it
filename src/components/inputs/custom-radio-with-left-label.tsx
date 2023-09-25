import { CustomRadioProps } from "@/types/types";

import "./inputs.css";

const CustomRadioWithLeftLabel: React.FC<CustomRadioProps & React.InputHTMLAttributes<HTMLInputElement>> = ({ method, name, label, ...rest }) => {
    const {
        formState: { errors },
        register,
      } = method;


    return (
        <section className="flex items-center mb-2.5 radio-input-left-label">
            <input 
            {...register(name)}
            name={name}
            className="appearance-none cursor-pointer opacity-0 p-1.5 translate-x-[63.5px] -translate-y-[5px] rounded-full border-2"
            type="radio"
            value={label}
            {...rest}
            />
            <label className="text-sm font-medium text-color7 dark:text-white"> {label} </label>
        </section>
    );
}
 
export default CustomRadioWithLeftLabel;