import { UseFormReturn } from "react-hook-form";
import { ErrorMsg } from "../alerts/error-msg";

type CustomColorInputProps = {
  name: string;
  label: string;
  method: UseFormReturn<any>;
};

const CustomColorInput: React.FC<
  CustomColorInputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({ method, name, label, ...rest }) => {
  const {
    formState: { errors },
    register,
  } = method;

  return (
    <section className="flex flex-col">
      <label className="text-base font-medium text-color7 dark:text-white">
        {label}
      </label>
      <input
        {...register(name)}
        name={name}
        className="mx-auto"
        type="color"
        {...rest}
      />
      {errors && (
        <ErrorMsg msg={errors[name]?.message ? errors[name]?.message : ""} />
      )}
    </section>
  );
};

export default CustomColorInput;
