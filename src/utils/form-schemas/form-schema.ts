import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("invalid email address")
    .required("email address is required"),
  password: yup.string().required("password is required"),
});

export const signupValidationSchema = yup.object().shape({
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

export const initialViewForgotPasswordValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("invalid email address")
    .required("email address is required"),
});

export const projectSetupValidationSchema = yup.object().shape({
  firstProject: yup.string().required("field is required"),
});

export const resendEmailValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("invalid email address")
    .required("email address is required"),
});

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const editProjectValidationSchema = yup.object().shape({
  image: yup
    .mixed()
    .notRequired()
    .test(
      "fileSize",
      "File size must not exceed 5MB",
      (value: any) => !value || value[0].size <= MAX_FILE_SIZE
    )
    .test(
      "fileType",
      "Only JPEG, JPG, PNG, SVG, WEBP and GIF images are allowed",
      (value: any) =>
        value
          ? [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/jpg",
              "image/svg+xml",
              "image/webp",
            ].includes(value[0].type)
          : true
    ),
  color: yup.string(),
  projectName: yup.string().required("project name is required"),
  category: yup.string().required("category is required"),
});

export const createProjectValidationSchema = yup.object().shape({
  image: yup
    .mixed()
    .notRequired()
    .test(
      "fileSize",
      "File size must not exceed 5MB",
      (value: any) => !value || value[0].size <= MAX_FILE_SIZE
    )
    .test(
      "fileType",
      "Only JPEG, JPG, PNG, SVG, WEBP and GIF images are allowed",
      (value: any) =>
        value
          ? [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/jpg",
              "image/svg+xml",
              "image/webp",
            ].includes(value[0].type)
          : true
    ),
  color: yup.string(),
  projectName: yup.string().required("project name is required"),
  category: yup.string().required("category is required"),
});

export const renameProjectValidationSchema = yup.object().shape({
  projectName: yup.string().required("project name is required"),
});

export const notificationValidationSchema = yup.object().shape({
  notification: yup.string().required(),
  from: yup
    .string()
    .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format")
    .required(),
  to: yup
    .string()
    .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format")
    .required(),
});

export const profileValidationSchema = yup.object().shape({
  gender: yup.string().required("please select a gender"),
});

export const createEventValidationSchema = yup.object().shape({
  title: yup.string().required("title is required"),
});
