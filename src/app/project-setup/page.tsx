"use client";

import { Metadata } from "next";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ProjectSetupSignUpFormValue } from "@/types/types";
import UnauthHeading from "@/components/headings/unauth-heading";
import UnauthWrapper from "@/components/wrappers/unauth-wrapper";
import UnauthButton from "@/components/buttons/unauth-button";
import { ErrorMsg } from "@/components/alerts/error-msg";

const metadata: Metadata = {
  title: "Sign up",
  description: "track-it sign-up page",
};

const validationSchema = yup.object().shape({
  firstProject: yup.string().required("field is required"),
});

const ProjectSetup = () => {
  const method = useForm<ProjectSetupSignUpFormValue>({
    resolver: yupResolver(validationSchema),
  });
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = method;

  const handleClick = (data: ProjectSetupSignUpFormValue) => {
    console.log(data);
  };

  return (
    <main>
      <UnauthWrapper>
        <UnauthHeading heading={"Let's set up your first project"} />
        <section className="max-w-[540px] mx-auto mt-10">
          <h2 className="text-sm font-medium text-color8">
            {" "}
            What{`'`}s something you are currently working on?{" "}
          </h2>
          <input
            {...register("firstProject")}
            className={`focus:outline-none w-full mt-8 mb-5  text-color1 dark:text-darkColor3 border-b ${
              errors["firstProject"] ? " border-error" : "border-color3"
            }`}
            name={"firstProject"}
            type={"text"}
          />
          {errors && (
            <ErrorMsg
              msg={
                errors["firstProject"]?.message
                  ? errors["firstProject"]?.message
                  : ""
              }
            />
          )}

          <UnauthButton handleSubmit={handleSubmit} handleClick={handleClick}>
            {" "}
            Next{" "}
          </UnauthButton>

          <span className="flex justify-center text-color3 font-medium text-sm mt-8 text-center">
            {" "}
            Skip This{" "}
          </span>
        </section>
      </UnauthWrapper>
    </main>
  );
};

export default ProjectSetup;
