import { LoginFormValues } from "@/types/types";
import axios from "axios";

export const logInUser = async (payload: LoginFormValues) => {
  const response = await axios.post("/api/login", payload);
  return response;
};

export const logOutUser = async () => {
  const response = await axios.post("/api/logout");
  return response;
};
