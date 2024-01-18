import { ReactElement } from "react";

type WrapperProps = {
  children: ReactElement[];
};

const UnauthWrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <section className="max-w-[740px] mx-3 xs:mx-auto mt-10 px-2 md:px-0 py-5 rounded-md bg-white shadow-lg dark:bg-darkColor2">
      {children}
    </section>
  );
};

export default UnauthWrapper;
