"use client";

import { Metadata } from "next";
import Link from "next/link";

import axios from "axios";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useMutation } from "@tanstack/react-query";

import { SignUpFormValues, SignUpViewsProp } from "@/types/types";

import { CustomInput } from "@/components/inputs/custom-input";
import UnauthHeading from "@/components/headings/unauth-heading";
import UnauthWrapper from "@/components/wrappers/unauth-wrapper";
import UnauthButton from "@/components/buttons/unauth-button";
import GoogleButton from "@/components/buttons/google-button";
import ScaleLineLoader from "@/components/loaders/scale-line-loader/scale-line-loader";
import { useRouter } from "next/navigation";
import { SuccessToast } from "@/components/toast/toasts";
import ErrorDisplayHandler from "@/utils/helpers/error-display-handler";

const metadata: Metadata = {
  title: "Sign up",
  description: "track-it sign-up page",
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("invalid email address")
    .required("email address is required"),
  password: yup.string().required("password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password is required"),
});

type signUpUserProps = {
  email: string;
  password: string;
};

const signUpUser = async (payload: signUpUserProps) => {
  const response = await axios.post("/api/sign-up", payload);
  return response;
};

const SignUp: React.FC<SignUpViewsProp> = ({ setView }) => {
  const router = useRouter();
  const method = useForm<SignUpFormValues>({
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit } = method;
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationKey: ["signUpUser"],
    mutationFn: signUpUser,
    onSuccess: () => SuccessToast("Account created successfully"),
  });

  const handleClick = (data: SignUpFormValues) => {
    const payload = {
      email: data.email,
      password: data.password,
    };
    mutate(payload);
  };

  return (
    <main>
      <UnauthWrapper>
        <UnauthHeading heading={"Sign up"} />
        <section className="max-w-[540px] mx-auto mt-10">
          <CustomInput
            name="email"
            label="Email address"
            defaultType={"text"}
            method={method}
          />
          <CustomInput
            name="password"
            defaultType="password"
            label="Password"
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
              {isPending ? <ScaleLineLoader /> : "Sign up"}
            </UnauthButton>
          </section>

          {isSuccess && (
            <section className="flex justify-center mt-2.5">
              <p className="text-base font-semibold text-black dark:text-color6">
                {" "}
                We&apos;ve sent an email to the address you provided. Please
                follow the instructions within to verify your account{" "}
              </p>
            </section>
          )}

          <section className="mt-2.5 text-center font-light text-error">
            {ErrorDisplayHandler(isError, error)}
          </section>

          <section className="flex items-center justify-center gap-2 mt-8">
            <div className="border-t h-0.5 mt-1 w-full border-color4 dark:border-darkColor4"></div>
            <span className="font-medium text-sm text-color5 dark:border-darkColor3">
              {" "}
              or{" "}
            </span>
            <div className="border-t h-0.5 mt-1 w-full border-color4 dark:border-darkColor4"></div>
          </section>

          <GoogleButton />

          <p className="text-color7 text-sm font-normal mt-5 text-center dark:text-white">
            Already have an account?{" "}
            <Link href={"/login"} className="text-color6 pl-1">
              {" "}
              Log in{" "}
            </Link>
          </p>
        </section>
      </UnauthWrapper>
    </main>
  );
};

export default SignUp;
