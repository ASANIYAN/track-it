import axios from "axios";

const url = process.env.MONGODB_URI as string;

const axiosClient = axios.create({
  baseURL: url,
});

export default axiosClient;
