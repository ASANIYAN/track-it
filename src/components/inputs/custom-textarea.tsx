import { CustomTextAreaProps } from "@/types/types";
import { ErrorMsg } from "../alerts/error-msg";
import { InputWrap } from "./input-wrap";

const CustomTextArea: React.FC<
  CustomTextAreaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ name, value, setValue, label, error, ...rest }) => {
  return (
    <>
      <InputWrap>
        <section className="textarea-container">
          <label> {label}</label>
          <textarea
            className={`resize-none bg-transparent focus:outline-none dark:text-white border ${
              error.length > 0 ? " border-error" : "border-color4"
            }`}
            name={name}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            {...rest}
          />
        </section>
        {error.length > 0 && <ErrorMsg msg={error} />}
      </InputWrap>
    </>
  );
};

export default CustomTextArea;
