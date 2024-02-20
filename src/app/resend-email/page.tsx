import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import UnauthButton from "@/components/buttons/unauth-button";
import UnauthHeading from "@/components/headings/unauth-heading";
import UnauthWrapper from "@/components/wrappers/unauth-wrapper";

import { CustomInput } from "@/components/inputs/custom-input";
import ErrorDisplayHandler from "@/utils/helpers/error-display-handler";
import ScaleLineLoader from "@/components/loaders/scale-line-loader/scale-line-loader";
import { resendEmailValidationSchema } from "@/utils/form-schemas/form-schema";

type ResendEmailFormValues = {
  email: string;
};

const sendEmailForVerification = async (payload: ResendEmailFormValues) => {
  const response = await axios.post("/api/users/resendemail", { payload });
  return response;
};

const ResendEmail = () => {
  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationKey: ["sendEmailForVerification"],
    mutationFn: sendEmailForVerification,
  });
  const method = useForm<ResendEmailFormValues>({
    resolver: yupResolver(resendEmailValidationSchema),
  });

  const { handleSubmit } = method;

  const handleClick = (data: ResendEmailFormValues) => {
    const payload = {
      email: data.email,
    };
    mutate(payload);
  };

  return (
    <UnauthWrapper>
      <UnauthHeading heading={"Resend email"} />
      <section className="max-w-[540px] mx-auto mt-10">
        <CustomInput
          name="email"
          label="Email address"
          defaultType={"text"}
          method={method}
        />
        <section className={`${isPending ? "opacity-0" : ""}`}>
          <UnauthButton
            disabled={isPending}
            handleSubmit={handleSubmit}
            handleClick={handleClick}
          >
            {" "}
            {isPending ? <ScaleLineLoader /> : "Resend Email"}
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

        <section className="mt-2.5 text-center font-light">
          {ErrorDisplayHandler(isError, error)}
        </section>
      </section>
    </UnauthWrapper>
  );
};

export default ResendEmail;
