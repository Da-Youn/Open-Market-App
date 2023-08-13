import { api } from '../axiosInstance';

const getCartList = async () => {
  try {
    const res = await api.get(`/cart/`);
    return res.data.results;
  } catch (error) {
    throw error;
  }
};

export default getCartList;
