import { api } from '../axiosInstance';
import { AxiosError } from 'axios';

const postAddCart = async (props: any) => {
  try {
    const res = await api.post(`/cart/`, props);
    return res;
  } catch (error) {
    const axiosError = error as AxiosError<Record<string, any>>;
    return axiosError.response;
  }
};

export default postAddCart;
