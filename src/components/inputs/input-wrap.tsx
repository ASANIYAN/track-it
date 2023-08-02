import "./inputs.css";

type InputProps = {
    children: React.ReactNode
}

export const InputWrap: React.FC<InputProps> = ({ children }) => {
    return (
        <div className="w-full flex flex-col mb-5 relative custom-input-wrap">
            { children }
        </div>
    )
}