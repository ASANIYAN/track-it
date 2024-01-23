import { Add, CloseCircle } from "iconsax-react";

type FirstStepProps = {
  handleCloseCreateProjectModal: () => void;
};

const FirstStep: React.FC<FirstStepProps> = ({
  handleCloseCreateProjectModal,
}) => {
  return (
    <section className="fixed top-0 left-0 bottom-0 right-0 m-auto bg-white dark:bg-darkColor2 w-full max-w-[760px] h-[480px] rounded-[10px] p-2.5 md:p-3">
      <section className="flex flex-col h-full">
        <section className="flex justify-end">
          <CloseCircle
            size={32}
            className="text-color1 dark:text-white lg:cursor-pointer"
            onClick={handleCloseCreateProjectModal}
          />
        </section>
        <section className="flex-grow flex flex-col justify-center items-center">
          <h3 className="text-color1 dark:text-white text-center font-normal text-base md:text-xl lg:text-[26px] leading-snug md:leading-normal lg:leading-loose">
            {" "}
            Create a new project{" "}
          </h3>
          <section className="flex flex-col gap-2.5 items-center justify-center mt-5">
            <section className="w-[68px] h-[68px] md:w-[100px] md:h-[100px] lg:w-[140px] lg:h-[140px] rounded-lg md:rounded-2xl lg:rounded-[20px] border-2 border-color2 dark:border-darkColor7 flex justify-center items-center">
              <Add size="32" className="text-color2 dark:text-darkColor7" />
            </section>
            <p className="text-center text-color1 dark:text-white text-sm md:text-base font-normal leading-tight">
              {" "}
              Blank project{" "}
            </p>
            <span className="text-center text-[11px] md:text-xs text-color1 dark:text-darkColor7 font-normal leading-[14px] -translate-y-2">
              {" "}
              Start from scratch{" "}
            </span>
          </section>
        </section>
      </section>
    </section>
  );
};

export default FirstStep;
