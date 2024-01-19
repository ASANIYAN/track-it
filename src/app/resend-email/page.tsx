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

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("invalid email address")
    .required("email address is required"),
});

type ResendEmailFormValues = {
  email: string;
};

const sendEmail = async (payload: ResendEmailFormValues) => {
  const response = await axios.post("/api/users/resendemail", { payload });
  return response;
};

const ResendEmail = () => {
  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationKey: ["sendEmail"],
    mutationFn: sendEmail,
  });
  const method = useForm<ResendEmailFormValues>({
    resolver: yupResolver(validationSchema),
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
        <UnauthButton
          disabled={isPending}
          handleSubmit={handleSubmit}
          handleClick={handleClick}
        >
          {" "}
          {isPending ? <ScaleLineLoader /> : "Resend Email"}
        </UnauthButton>

        <section className="mt-2.5 text-center font-light">
          {ErrorDisplayHandler(isError, error)}
        </section>
      </section>
    </UnauthWrapper>
  );
};

export default ResendEmail;
