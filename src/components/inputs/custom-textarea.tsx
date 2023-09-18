import { CustomTextAreaProps } from "@/types/types";
import { ErrorMsg } from "../alerts/error-msg";
import { InputWrap } from "./input-wrap";

const CustomTextArea: React.FC<CustomTextAreaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ method, name, label, ...rest }) => {
    const {
        formState: { errors },
        register,
      } = method;

    return (
        <>
            <InputWrap>
                <section className="textarea-container">
                    <label> {label }</label>
                    <textarea
                        {...register(name)}
                        className={`resize-none bg-transparent focus:outline-none dark:text-darkColor3 border ${errors[name] ? ' border-error' : 'border-color4'}`}
                        name={name}    
                        {...rest} 
                    />
                </section>
                { errors[name] && <ErrorMsg msg={errors[name]} /> }
            </InputWrap>
        </>
    );
}

export default CustomTextArea;