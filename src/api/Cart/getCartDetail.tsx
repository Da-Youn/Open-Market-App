import { urlApi } from '../axiosInstance';
import { AxiosResponse } from 'axios';

const getCartList = async (
  product_id: number,
): Promise<AxiosResponse<any, any>> => {
  try {
    const res = await urlApi.get(`/cart/${product_id}/`);
    console.log(res);
    return res.data.results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getCartList;
