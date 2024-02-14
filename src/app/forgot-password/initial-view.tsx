"use client";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { CustomInput } from "@/components/inputs/custom-input";
import {
  ForgetPasswordViews,
  ForgetPasswordViewsProp,
  ForgotPasswordFormValues,
} from "@/types/types";
import UnauthHeading from "@/components/headings/unauth-heading";
import UnauthWrapper from "@/components/wrappers/unauth-wrapper";
import UnauthButton from "@/components/buttons/unauth-button";
import Link from "next/link";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import ErrorDisplayHandler from "@/utils/helpers/error-display-handler";
import ScaleLineLoader from "@/components/loaders/scale-line-loader/scale-line-loader";
import { SuccessToast } from "@/components/toast/toasts";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("invalid email address")
    .required("email address is required"),
});

type InitialViewProps = {
  handleSetViewAndEmail: (view: ForgetPasswordViews, email: string) => void;
};

const sendEmailToResetPassword = async (payload: ForgotPasswordFormValues) => {
  const response = await axios.post("/api/users/forgotpassword", payload);
  return response;
};

const InitialView: React.FC<InitialViewProps> = ({ handleSetViewAndEmail }) => {
  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationKey: ["sendEmailToResetPassword"],
    mutationFn: sendEmailToResetPassword,
    onSuccess: (data) => {
      const email = data?.data?.email;
      SuccessToast(data?.data?.message);
      handleSetViewAndEmail("FinalView", email);
    },
  });
  const method = useForm<ForgotPasswordFormValues>({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = method;

  const handleClick = (data: ForgotPasswordFormValues) => {
    const payload = {
      email: data.email,
    };
    mutate(payload);
    // handleSetViewAndEmail("FinalView", data.email);
  };

  return (
    <UnauthWrapper>
      <UnauthHeading heading={"Forgot your password?"} />
      <section className="max-w-[540px] mx-auto mt-10">
        <CustomInput
          name="email"
          label="Email address"
          defaultType={"text"}
          method={method}
        />

        <section className={`${isPending ? "opacity-80" : ""}`}>
          <UnauthButton
            disabled={isPending}
            handleSubmit={handleSubmit}
            handleClick={handleClick}
          >
            {" "}
            {isPending ? <ScaleLineLoader /> : "Continue"}
          </UnauthButton>
        </section>

        <section className="mt-2.5 text-center font-light text-error">
          {ErrorDisplayHandler(isError, error)}
        </section>

        <Link
          href={"/login"}
          className="flex justify-center text-color3 font-medium text-sm mt-8 text-center"
        >
          {" "}
          Back to log in{" "}
        </Link>
      </section>
    </UnauthWrapper>
  );
};

export default InitialView;
