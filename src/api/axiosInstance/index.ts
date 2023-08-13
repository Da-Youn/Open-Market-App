import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { AUTH_TOKEN, BASE_URL } from './constants';

interface ApiConfig extends AxiosRequestConfig {
  headers?: {
    Authorization?: string;
    'Content-Type'?: string;
  };
}

const commonConfig: ApiConfig = {
  baseURL: BASE_URL,
};

const api: AxiosInstance = axios.create({
  ...commonConfig,
  headers: {
    Authorization: `JWT ${AUTH_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

const urlApi: AxiosInstance = axios.create(commonConfig);

const headerApi: AxiosInstance = axios.create({
  ...commonConfig,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { api, urlApi, headerApi };
