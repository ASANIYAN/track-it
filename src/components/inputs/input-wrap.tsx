import "./inputs.css";

type InputProps = {
  children: React.ReactNode;
};

export const InputWrap: React.FC<InputProps> = ({ children }) => {
  return (
    <section className="w-full flex flex-col relative custom-input-wrap">
      {children}
    </section>
  );
};
