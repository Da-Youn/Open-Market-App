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

// 기본 axios 인스턴스
const axiosInstance: AxiosInstance = axios.create({
  ...commonConfig,
  headers: {
    'Content-Type': 'application/json',
  },
});

// user token 값을 사용하는 인스턴스
const userInstance: AxiosInstance = axios.create({
  ...commonConfig,
  headers: {
    Authorization: `JWT ${AUTH_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// url값만 사용하는 인스턴스
const urlInstance: AxiosInstance = axios.create(commonConfig);

export { axiosInstance, userInstance, urlInstance };
