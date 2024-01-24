import { Add, CloseCircle } from "iconsax-react";
import { stepOptions } from "./create-project";

type FirstStepProps = {
  handleCloseCreateProjectModal: () => void;
  handleSetStep: (value: stepOptions) => void;
};

const FirstStep: React.FC<FirstStepProps> = ({
  handleCloseCreateProjectModal,
  handleSetStep,
}) => {
  return (
    <section className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-darkColor2 w-full max-w-[327px] sm:max-w-[500px] md:max-w-[760px] h-[350px] md:h-[480px] rounded-[10px] p-3">
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
            <section
              className="w-[68px] h-[68px] md:w-[100px] md:h-[100px] lg:w-[140px] lg:h-[140px] rounded-lg md:rounded-2xl lg:rounded-[20px] border-2 border-color2 dark:border-darkColor7 flex justify-center items-center lg:cursor-pointer"
              onClick={() => handleSetStep("second-step")}
            >
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
