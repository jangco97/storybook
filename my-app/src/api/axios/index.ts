import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

const BASE_URL = process.env.BACKEND_URL;

const createAxiosInstance = (url: string) => {
  const endpoint = url;
  const instance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });

  const get = async (params: object = {}) => {
    try {
      const res = await instance.get(endpoint, params);

      const { data, status } = res;
      return { ...data, status };
    } catch (error) {
      console.error(error);
    }
  };

  const post = async (params: object = {}, config?: AxiosRequestConfig) => {
    try {
      const res = await instance.post(endpoint, params, config);

      const { data, status } = res;
      return { ...data, status };
    } catch (error) {
      console.error(error);
    }
  };

  return { get, post };
};

export default createAxiosInstance;
