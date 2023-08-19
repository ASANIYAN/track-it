import { UseFormReturn } from 'react-hook-form';

type CustomInputProps = {
    name: string,
    method: UseFormReturn<any>,
}

const CheckBox: React.FC<CustomInputProps> = ({ method, name }) => {
    const {
        formState: { errors },
        register,
      } = method;
    return (
        <>
             <input
                {...register(name)}
                className="focus:outline-none w-3.5 h-3.5 text-color6 bg-[#BDBDBD] border-[#BDBDBD] focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                type={'checkbox'}
                name={name}
            />
        </>
    );
}
 
export default CheckBox;