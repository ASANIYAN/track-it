"use client";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { CustomInput } from "@/components/inputs/custom-input";
import { ResetPasswordValues } from "@/types/types";
import UnauthHeading from "@/components/headings/unauth-heading";
import UnauthWrapper from "@/components/wrappers/unauth-wrapper";
import UnauthButton from "@/components/buttons/unauth-button";

import Link from "next/link";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { SuccessToast } from "@/components/toast/toasts";
import ScaleLineLoader from "@/components/loaders/scale-line-loader/scale-line-loader";
import ErrorDisplayHandler from "@/utils/helpers/error-display-handler";

const validationSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password is required"),
});

const sendNewPassword = async (payload: {
  password: string;
  token: string;
}) => {
  const response = await axios.post("/api/users/resetpassword", payload);
  return response;
};

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("resetToken")!;

  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationKey: ["sendNewPassword"],
    mutationFn: sendNewPassword,
    onSuccess: (data) => {
      SuccessToast(data?.data?.message);
    },
  });

  const method = useForm<ResetPasswordValues>({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = method;

  const handleClick = (data: ResetPasswordValues) => {
    console.log(data);
    const payload = {
      password: data.password,
      token,
    };
    mutate(payload);
  };

  return (
    <UnauthWrapper>
      <UnauthHeading heading={"Reset your password"} />
      <section className="max-w-[540px] mx-auto mt-10">
        <CustomInput
          name="password"
          label="New password"
          defaultType={"password"}
          method={method}
        />
        <CustomInput
          name="confirmPassword"
          label="Confirm new password"
          defaultType={"password"}
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
          Back to sign in{" "}
        </Link>
      </section>
    </UnauthWrapper>
  );
};

export default ResetPassword;
