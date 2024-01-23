import { Add, CloseCircle } from "iconsax-react";

const FirstStep = () => {
  return (
    <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-darkColor2 w-full max-w-[760px] h-[480px] rounded-[10px] p-2.5">
      <section className="flex justify-end">
        <CloseCircle className="text-color1 dark:text-white" />
      </section>
      <h3 className="text-color1 dark:text-white text-center font-normal text-base md:text-xl lg:text-[26px] leading-snug md:leading-normal lg:leading-loose">
        {" "}
        Create a new project{" "}
      </h3>
      <section className="flex flex-col gap-2.5 items-center justify-center">
        <section className="w-[68px] h-[68px] md:w-[100px] md:h-[100px] lg:w-[140px] lg:h-[140px] rounded-lg md:rounded-2xl lg:rounded-[20px] border-2 border-color2 dark:border-darkColor7">
          <Add size="32" className="text-color2 dark:text-darkColor7" />
        </section>
        <p className="text-center text-color1 dark:text-white text-xs md:text-sm font-normal leading-tight">
          {" "}
          Blank project{" "}
        </p>
        <p className="text-center text-[10px] md:text-[11px] text-color1 dark:text-darkColor7 font-normal leading-[14px]">
          {" "}
          Start from scratch{" "}
        </p>
      </section>
    </section>
  );
};

export default FirstStep;
