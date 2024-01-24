import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Camera, ProfileCircle, Trash } from "iconsax-react";
import CustomRadio from "../inputs/custom-radio";
import { CustomInput } from "../inputs/custom-input";
import CustomTextArea from "../inputs/custom-textarea";
import { useState } from "react";

const validationSchema = yup.object().shape({
  gender: yup.string().required("please select a gender"),
});

export type ProfileFormValues = {
  gender: string;
};

const Profile = () => {
  const [about, setAbout] = useState<string>("");
  const [aboutError, setAboutError] = useState<string>("");

  const method = useForm<ProfileFormValues>({
    resolver: yupResolver(validationSchema),
  });

  return (
    <section>
      <section className="flex items-center justify-center gap-5">
        <Camera size={22} color="#878B8F" />
        <ProfileCircle size={100} color="#878B8F" />
        <Trash size={22} color="#878B8F" />
      </section>
      <section className="flex items-center justify-center mt-5 gap-2 xxs:gap-3 xs:gap-5">
        <CustomRadio name={"gender"} label={"Male"} method={method} />
        <CustomRadio name={"gender"} label={"Female"} method={method} />
        <CustomRadio name={"gender"} label={"Other"} method={method} />
      </section>

      <section className="grid justify-center grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        <CustomInput
          name="fullName"
          label="Full name"
          method={method}
          defaultType="text"
        />
        <CustomInput
          name="role"
          label="Role"
          method={method}
          defaultType="text"
        />
        <CustomInput
          name="email"
          label="Email"
          method={method}
          defaultType="text"
        />
        <CustomInput
          name="username"
          label="Username"
          method={method}
          defaultType="text"
        />
      </section>
      <CustomTextArea
        name="about"
        label="About"
        value={about}
        error={aboutError}
        setValue={setAbout}
        rows={3}
      />
    </section>
  );
};

export default Profile;
