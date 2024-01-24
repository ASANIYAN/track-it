import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ArrowLeft, CloseCircle } from "iconsax-react";
import { FaCamera } from "react-icons/fa";
import { CustomInput } from "@/components/inputs/custom-input";
import { CustomSelect } from "@/components/inputs/custom-select";
import CustomTextArea from "@/components/inputs/custom-textarea";

import { stepOptions } from "./create-project";
import CustomColorInput from "@/components/inputs/custom-color-input";
import UnauthButton from "@/components/buttons/unauth-button";
import { useState } from "react";

const validationSchema = yup.object().shape({
  color: yup.string(),
  projectName: yup.string().required("project name is required"),
  category: yup.string().required("category is required"),
  // description: yup.string().required("description is required"),
});

type SecondStepFormValues = {
  color: string | undefined;
  projectName: string;
  category: string;
  // description: string;
};

type SecondStepProps = {
  handleCloseCreateProjectModal: () => void;
  handleSetStep: (value: stepOptions) => void;
};

const categoryOptions = [
  { label: "Design", value: "Design" },
  { label: "Development", value: "Development" },
  { label: "Marketing", value: "Marketing" },
  { label: "Operations", value: "Operations" },
  { label: "Education", value: "Education" },
  { label: "Sales", value: "Sales" },
  { label: "HR", value: "HR" },
  { label: "IT", value: "IT" },
  { label: "Engineering", value: "Engineering" },
];

const SecondStep: React.FC<SecondStepProps> = ({
  handleCloseCreateProjectModal,
  handleSetStep,
}) => {
  const [description, setDescription] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");

  const method = useForm<SecondStepFormValues>({
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit } = method;
  const handleClick = (data: SecondStepFormValues) => {
    if (description) {
      console.log("projectInfo", data);
      console.log("textarea", description);
    } else {
      setDescriptionError("description is required");
    }
  };
  return (
    <section className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-darkColor2 w-full max-w-[327px] sm:max-w-[500px] md:max-w-[760px] rounded-[10px] p-3 h-fit lg:h-[70vh] xl:h-[90vh] overflow-y-auto">
      <section className="flex justify-between">
        <ArrowLeft
          size="32"
          className="text-color1 dark:text-white lg:cursor-pointer"
          onClick={() => handleSetStep("first-step")}
        />
        <CloseCircle
          size={32}
          className="text-color1 dark:text-white lg:cursor-pointer"
          onClick={handleCloseCreateProjectModal}
        />
      </section>

      <section className="flex flex-col justify-center items-center gap-2">
        <h3 className="text-color1 dark:text-white text-center font-normal text-base md:text-xl lg:text-[26px] leading-snug md:leading-normal lg:leading-loose">
          Create a new project
        </h3>

        <section className="w-[68px] h-[68px] md:w-[80px] md:h-[80px] lg:w-[120px] lg:h-[120px] rounded-[10px] border border-color5 dark:darkColor7 flex justify-center items-center">
          <FaCamera className="text-color5 dark:text-darkColor7 text-3xl" />
        </section>

        <section className="mt-3">
          <CustomColorInput name="color" label="Select color" method={method} />
        </section>

        <section className="flex flex-col justify-center items-center gap-2 w-full max-w-[540px]">
          <CustomInput
            name="projectName"
            defaultType="text"
            label="Project Name"
            method={method}
          />

          <CustomSelect
            method={method}
            name="category"
            defaultValue={"Design"}
            label="Category"
            options={categoryOptions}
          />

          <CustomTextArea
            name="description"
            label="Description"
            value={description}
            error={descriptionError}
            setValue={setDescription}
            rows={4}
          />

          <button
            className="w-full text-center text-white py-3.5 text-base md:text-lg font-medium leading-snug bg-color6 rounded-[5px]"
            onClick={handleSubmit(handleClick)}
          >
            Create Project
          </button>
        </section>
      </section>
    </section>
  );
};

export default SecondStep;
