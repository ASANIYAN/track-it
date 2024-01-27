"use client";

import { Metadata } from "next";
import Link from "next/link";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { LoginFormValues } from "@/types/types";

import { CustomInput } from "@/components/inputs/custom-input";
import UnauthHeading from "@/components/headings/unauth-heading";
import UnauthWrapper from "@/components/wrappers/unauth-wrapper";
import UnauthButton from "@/components/buttons/unauth-button";
import GoogleButton from "@/components/buttons/google-button";
import ScaleLineLoader from "@/components/loaders/scale-line-loader/scale-line-loader";

import ErrorDisplayHandler from "@/utils/helpers/error-display-handler";
import { SuccessToast } from "@/components/toast/toasts";
import { useRouter } from "next/navigation";

const metadata: Metadata = {
  title: "Login",
  description: "track-it login page",
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("invalid email address")
    .required("email address is required"),
  password: yup.string().required("password is required"),
});

const logInUser = async (payload: LoginFormValues) => {
  const response = await axios.post("/api/login", payload);
  return response;
};

const Login = () => {
  const router = useRouter();
  const method = useForm<LoginFormValues>({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = method;

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["logInUser"],
    mutationFn: logInUser,
    onSuccess: () => {
      router.push("/");
      SuccessToast("Login Successful");
    },
  });

  const handleClick = (data: LoginFormValues) => {
    console.log(data);

    const payload = {
      email: data.email,
      password: data.password,
    };

    mutate(payload);
  };

  return (
    <main>
      <UnauthWrapper>
        <UnauthHeading heading={"Welcome back"} />
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
          <p className="text-[12px] font-normal text-color2 dark:text-darkColor3 hover:text-color6 lg:cursor-pointer -translate-y-5">
            <Link href={"forgot-password"}> Forgot your password? </Link>
          </p>

          <section className={`${isPending ? "opacity-80" : ""}`}>
            <UnauthButton
              disabled={isPending}
              handleSubmit={handleSubmit}
              handleClick={handleClick}
            >
              {" "}
              {isPending ? <ScaleLineLoader /> : "Log in"}
            </UnauthButton>
          </section>

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
            Don&#39;t have an account?{" "}
            <Link href={"/sign-up"} className="text-color6 pl-1">
              {" "}
              Sign up{" "}
            </Link>
          </p>
        </section>
      </UnauthWrapper>
    </main>
  );
};

export default Login;
