import { Dispatch, SetStateAction } from "react";
import { DateRange } from "react-day-picker";
import { UseFormReturn } from "react-hook-form";

export type LoginFormValues = {
  email: string;
  password: string;
};

export type SignUpFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type ForgotPasswordFormValues = {
  email: string;
};

export type ProjectSetupSignUpFormValue = {
  firstProject: string;
};

export type ForgetPasswordViews = "InitialView" | "FinalView";

export type ForgetPasswordViewsProp = {
  setView: React.Dispatch<React.SetStateAction<ForgetPasswordViews>>;
};

export type SignUpViews = "SignUpView" | "SetUpView";

export type SignUpViewsProp = {
  setView: React.Dispatch<React.SetStateAction<SignUpViews>>;
};

export type ResetPasswordValues = {
  password: string;
  confirmPassword: string;
};

export type SearchBarProps = {
  width?: string;
};

export type CustomInputProps = {
  name: string;
  label: string;
  defaultType: string;
  method: UseFormReturn<any>;
};

export type CustomTextAreaProps = {
  name: string;
  label: string;
  value: string;
  error: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export type CustomRadioProps = {
  name: string;
  label: string;
  method: UseFormReturn<any>;
};

export type CustomCheckboxProps = {
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type ProjectsProps = {
  heading?: string;
  data: AllProject[];
};

type usersFromAllProject = {
  role: string;
  user: {
    _id: string;
    email: string;
  };
};

export type AllProject = {
  _id: string;
  category: string;
  color: string;
  description: string;
  image: {
    id: string;
    url: string;
  };
  favourite: boolean;
  name: string;
  tasks: [];
  users: usersFromAllProject[];
};

export interface CreateEventFormValues {
  title: string;
}

export interface Event {
  title: string;
  start: Date | string;
  end: Date | string;
  allDay: boolean;
  id: number;
  textColor: string;
  borderColor: string;
  backgroundColor: string;
}

export interface CreateEventModalProps {
  showModal: boolean;
  textColor: string;
  backgroundColor: string;
  method: UseFormReturn<any>;
  handleCloseModal: () => void;
  range: DateRange | undefined;
  handleCreateEvent: (data: CreateEventFormValues) => void;
  setRange: Dispatch<SetStateAction<DateRange | undefined>>;
  handleColorPickerSelection: (color: { hex: string }) => void;
  handleColorPickerSelectionForText: (color: { hex: string }) => void;
}
