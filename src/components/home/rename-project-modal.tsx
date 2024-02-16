import axios from "axios";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CloseCircle } from "iconsax-react";

import { SuccessToast } from "@/components/toast/toasts";
import { CustomInput } from "@/components/inputs/custom-input";
import ScaleLineLoader from "@/components/loaders/scale-line-loader/scale-line-loader";

import { useProjectStore } from "@/store/project-store";
import ErrorDisplayHandler from "@/utils/helpers/error-display-handler";
import { renameProject } from "@/utils/requests/patch-requests";

const validationSchema = yup.object().shape({
  projectName: yup.string().required("project name is required"),
});

type RenameProjectModalFormValues = { projectName: string };

type RenameProjectModalProps = {
  setRenameProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const RenameProjectModal: React.FC<RenameProjectModalProps> = ({
  setRenameProjectModal,
}) => {
  const { singleProject } = useProjectStore();

  const method = useForm<RenameProjectModalFormValues>({
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit } = method;

  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["renameProject"],
    mutationFn: renameProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProject"] });
      setRenameProjectModal(false);
      SuccessToast("Project renamed successfully");
    },
  });

  const handleClick = (data: RenameProjectModalFormValues) => {
    const { projectName } = data;
    const payload = {
      id: singleProject !== null ? singleProject._id : "",
      name: projectName,
    };
    mutate(payload);
  };

  return (
    <>
      <section className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20" />
      <section className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-darkColor2 w-full max-w-[327px] sm:max-w-[500px] md:max-w-[760px] rounded-[10px] p-3 h-fit z-50">
        <section className="flex justify-end">
          <CloseCircle
            size={32}
            className="text-color1 dark:text-white lg:cursor-pointer"
            onClick={() => setRenameProjectModal(false)}
          />
        </section>

        <section className="flex flex-col justify-center items-center gap-2">
          <h3 className="text-color1 dark:text-white text-center font-normal text-base md:text-xl lg:text-[26px] leading-snug md:leading-normal lg:leading-loose">
            Rename project
          </h3>

          <section className="flex flex-col justify-center items-center gap-2 w-full max-w-[540px]">
            <CustomInput
              name="projectName"
              defaultType="text"
              label="Project Name"
              method={method}
            />

            <button
              className={`w-full text-center text-white py-3.5 text-base md:text-lg font-medium leading-snug bg-color6 rounded-[5px] ${
                isPending ? "opacity-80" : ""
              }`}
              onClick={handleSubmit(handleClick)}
            >
              {isPending ? <ScaleLineLoader /> : "Edit Project"}
            </button>

            <section className="mt-2.5 text-center font-light text-error">
              {ErrorDisplayHandler(isError, error)}
            </section>
          </section>
        </section>
      </section>
    </>
  );
};

export default RenameProjectModal;
