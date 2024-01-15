"use client";

import UnauthHeading from "@/components/headings/unauth-heading";
import UnauthWrapper from "@/components/wrappers/unauth-wrapper";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const verifyToken = async (token: string) => {
  const response = await axios.post("/api/your-endpoint", { token });
  return response;
};

const VerifyEmail = () => {
  const router = useRouter();
  const token = window.location.search.split("=")[1];

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["verifyToken"],
    mutationFn: verifyToken,
  });

  useEffect(() => {
    if (token) {
      mutate(token);
    }
  }, [token, mutate]);

  return (
    <UnauthWrapper>
      <UnauthHeading heading={"Email Verification"} />
      <section className="max-w-[540px] mx-auto mt-10">
        {/* <Link href={"/login"} className='flex justify-center text-color3 font-medium text-sm mt-8 text-center'> Back to sign in  </Link> */}
      </section>
    </UnauthWrapper>
  );
};

export default VerifyEmail;
