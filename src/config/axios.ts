import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

function createAxiosInstance(config?: AxiosRequestConfig): AxiosInstance {
  const instance = axios.create({
    ...config,
    timeout: 5000,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      throw error;
    }
  );

  return instance;
}

export default createAxiosInstance;
