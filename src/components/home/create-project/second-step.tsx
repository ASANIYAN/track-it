import { useState } from "react";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FaCamera } from "react-icons/fa";
import { ArrowLeft, CloseCircle } from "iconsax-react";

import { stepOptions } from "./create-project";

import { SuccessToast } from "@/components/toast/toasts";
import { CustomInput } from "@/components/inputs/custom-input";
import { CustomSelect } from "@/components/inputs/custom-select";
import CustomTextArea from "@/components/inputs/custom-textarea";
import CustomColorInput from "@/components/inputs/custom-color-input";
import ScaleLineLoader from "@/components/loaders/scale-line-loader/scale-line-loader";

import ErrorDisplayHandler from "@/utils/helpers/error-display-handler";
import { categoryOptions } from "@/constants/constants";

const validationSchema = yup.object().shape({
  color: yup.string(),
  projectName: yup.string().required("project name is required"),
  category: yup.string().required("category is required"),
});

type SecondStepFormValues = {
  color: string | undefined;
  projectName: string;
  category: string;
};

type SecondStepProps = {
  handleCloseCreateProjectModal: () => void;
  handleSetStep: (value: stepOptions) => void;
};

const createProject = async (payload: {
  projectName: string;
  color: string;
  description: string;
  category: string;
}) => {
  const response = await axios.post("/api/auth/create-project", payload);
  return response;
};

const SecondStep: React.FC<SecondStepProps> = ({
  handleCloseCreateProjectModal,
  handleSetStep,
}) => {
  const [description, setDescription] = useState<string>("");

  const method = useForm<SecondStepFormValues>({
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit } = method;

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationKey: ["createProject"],
    mutationFn: createProject,
    onSuccess: () => SuccessToast("Project created successfully", "top-left"),
  });

  const handleClick = (data: SecondStepFormValues) => {
    const { color, projectName, category } = data;
    const payload = {
      name: projectName,
      color,
      category,
      description,
    };
    console.log(payload);
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
            error={""}
            setValue={setDescription}
            rows={4}
          />

          <button
            className={`w-full text-center text-white py-3.5 text-base md:text-lg font-medium leading-snug bg-color6 rounded-[5px] ${
              isPending ? "opacity-80" : ""
            }`}
            onClick={handleSubmit(handleClick)}
          >
            {isPending ? <ScaleLineLoader /> : "Create Project"}
          </button>

          <section className="mt-2.5 text-center font-light text-error">
            {ErrorDisplayHandler(isError, error)}
          </section>
        </section>
      </section>
    </section>
  );
};

export default SecondStep;
