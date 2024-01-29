import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

import { BASE_URL } from './constants';

interface ApiConfig extends AxiosRequestConfig {
  headers?: {
    Authorization?: string;
    'Content-Type'?: string;
  };
}

const onRequest = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `JWT ${token}`;
  }
  return config;
};

const commonConfig: ApiConfig = {
  baseURL: BASE_URL,
};

// 기본  인스턴스
const axiosInstance: AxiosInstance = axios.create({
  ...commonConfig,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 인증 요청 인스턴스
const userInstance: AxiosInstance = axios.create({
  ...commonConfig,
  headers: {
    'Content-Type': 'application/json',
  },
});
userInstance.interceptors.request.use(onRequest);

const imgInstance: AxiosInstance = axios.create({
  ...commonConfig,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
imgInstance.interceptors.request.use(onRequest);

// url값만 사용하는 인스턴스
const urlInstance: AxiosInstance = axios.create(commonConfig);

export { axiosInstance, userInstance, urlInstance, imgInstance };
