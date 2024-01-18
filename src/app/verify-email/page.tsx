"use client";

import Button from "@/components/buttons/button";
import UnauthHeading from "@/components/headings/unauth-heading";
import SpinnerLoader from "@/components/loaders/spinner-loader/spinner-loader";
import ErrorDisplayHandler from "@/utils/helpers/error-display-handler";
import { useMutation } from "@tanstack/react-query";

import axios from "axios";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const verifyToken = async (token: string) => {
  const response = await axios.post("/api/users/verifyemail", { token });
  return response;
};

const VerifyEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("verifyToken");

  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationKey: ["verifyToken"],
    mutationFn: verifyToken,
  });

  useEffect(() => {
    if (token) {
      mutate(token);
    }
  }, [token, mutate]);

  const handleClick = () => {
    router.push("/login");
  };

  return (
    <section className="max-w-[740px] mx-3 xs:mx-auto mt-10 px-2 md:px-0 py-5 rounded-md bg-white shadow-lg dark:bg-darkColor2">
      {isSuccess && <UnauthHeading heading={"Email Verification Successful"} />}
      <section className="max-w-[540px] mx-auto">
        {isSuccess && (
          <section className="mt-5 flex justify-center">
            <Button handleClick={handleClick}> Click Here to Login </Button>
          </section>
        )}
        <section className="flex justify-center items-center">
          {isPending && <SpinnerLoader />}
        </section>
        <section className="text-2xl font-semibold flex justify-center">
          {isError && ErrorDisplayHandler(isError, error)}
        </section>
      </section>
    </section>
  );
};

export default VerifyEmail;
