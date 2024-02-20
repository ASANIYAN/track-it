import Image from "next/image";
import { useEffect, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FaCamera } from "react-icons/fa";
import { CloseCircle } from "iconsax-react";

import { CustomInput } from "@/components/inputs/custom-input";
import { CustomSelect } from "@/components/inputs/custom-select";
import CustomTextArea from "@/components/inputs/custom-textarea";
import { ErrorToast, SuccessToast } from "@/components/toast/toasts";
import CustomColorInput from "@/components/inputs/custom-color-input";
import ScaleLineLoader from "@/components/loaders/scale-line-loader/scale-line-loader";

import ErrorDisplayHandler from "@/utils/helpers/error-display-handler";
import { categoryOptions } from "@/constants/constants";
import { ErrorMsg } from "@/components/alerts/error-msg";
import { useProjectStore } from "@/store/project-store";
import { updateProject } from "@/utils/requests/put-requests";
import { editProjectValidationSchema } from "@/utils/form-schemas/form-schema";

type EditProjectModalFormValues = {
  image: any;
  color: string | undefined;
  projectName: string;
  category: string;
};

type EditProjectModalProps = {
  setEditProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditProjectModal: React.FC<EditProjectModalProps> = ({
  setEditProjectModal,
}) => {
  const { singleProject } = useProjectStore();

  const [description, setDescription] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");

  const method = useForm<EditProjectModalFormValues>({
    resolver: yupResolver(editProjectValidationSchema),
  });
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = method;

  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationKey: ["updateProject"],
    mutationFn: updateProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProject"] });
      SuccessToast("Project updated successfully", "top-left");
      setEditProjectModal(false);
    },
    onError: () => {
      ErrorToast("Error occurred, please try again");
    },
  });

  const handleImageRemoval = () => {
    setValue("image", "");
    setImagePreview("");
  };

  const handleClick = (data: EditProjectModalFormValues) => {
    const { image, color, projectName, category } = data;
    const payload = {
      id: singleProject !== null ? singleProject._id : "",
      image: imagePreview,
      color,
      name: projectName,
      category: category,
      description,
    };
    console.log(payload, "payload");
    mutate(payload);
  };

  const trackImageInput = () => {
    let image_watcher = watch("image");
    if (image_watcher[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const readerResult = reader.result as string;
        setImagePreview(readerResult);
      };
      reader.readAsDataURL(image_watcher[0]);
      // setImagePreview(image_watcher);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(trackImageInput, [watch("image")]);

  const handleFormUpdateFromStore = () => {
    if (singleProject !== null) {
      setValue("color", singleProject?.color);
      setValue("projectName", singleProject?.name);
      setDescription(singleProject?.description);
      setValue("category", singleProject?.category);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handleFormUpdateFromStore, []);

  return (
    <>
      <section className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20" />
      <section className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-darkColor2 w-full max-w-[327px] sm:max-w-[500px] md:max-w-[760px] rounded-[10px] p-3 h-fit lg:h-[70vh] xl:h-[90vh] overflow-y-auto z-50">
        <section className="flex justify-end">
          <CloseCircle
            size={32}
            className="text-color1 dark:text-white lg:cursor-pointer"
            onClick={() => setEditProjectModal(false)}
          />
        </section>

        <section className="flex flex-col justify-center items-center gap-2">
          <h3 className="text-color1 dark:text-white text-center font-normal text-base md:text-xl lg:text-[26px] leading-snug md:leading-normal lg:leading-loose">
            Edit project
          </h3>

          <section className="mt-4 relative">
            {imagePreview && (
              <span className="text-xl text-color6 font-medium absolute top-1 right-1 lg:cursor-pointer">
                <CloseCircle
                  size={18}
                  className="text-color6 lg:cursor-pointer"
                  onClick={handleImageRemoval}
                />
              </span>
            )}
            <label
              htmlFor="image"
              className={`lg:cursor-pointer w-[68px] h-[68px] md:w-[80px] md:h-[80px] lg:w-[120px] lg:h-[120px] rounded-[10px] flex justify-center items-center border 
            ${imagePreview ? "" : "border-color5 dark:border-darkColor7"}`}
            >
              <input
                type="file"
                id="image"
                {...register("image")}
                className="hidden"
              />
              {imagePreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imagePreview}
                  alt="Uploaded"
                  className="w-[68px] h-[68px] md:w-[80px] md:h-[80px] lg:w-[120px] lg:h-[120px] rounded"
                />
              ) : singleProject !== null ? (
                <Image
                  src={singleProject.image.url}
                  width={120}
                  height={120}
                  className="w-[68px] h-[68px] md:w-[80px] md:h-[80px] lg:w-[120px] lg:h-[120px] rounded"
                  alt={`${singleProject?.name}-img`}
                />
              ) : (
                <FaCamera className="text-color5 dark:text-darkColor7 text-2xl md:text-3xl lg:text-5xl" />
              )}
            </label>
          </section>
          {errors["image"] && (
            <section className="flex justify-center -mt-3">
              {" "}
              <ErrorMsg msg={errors["image"]?.message} />{" "}
            </section>
          )}

          <section className="mt-3">
            <CustomColorInput
              name="color"
              label="Select color"
              method={method}
            />
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

export default EditProjectModal;
