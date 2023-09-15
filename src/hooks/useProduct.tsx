import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';
import { productAtom } from 'src/atoms/productAtom';
import {
  axiosInstance,
  urlInstance,
  userInstance,
} from 'src/api/axiosInstance';

export interface ProductTypes {
  product_id?: number;
  created_at?: string;
  updated_at?: string;
  image?: string;
  product_name?: string;
  price?: number;
  shipping_method?: string;
  shipping_fee?: number;
  stock?: string;
  products_info?: string;
  seller?: number;
  store_name?: string;
}

export const useGetProduct = (product_id: number) => {
  const [productData, setProductData] =
    useRecoilState<ProductTypes>(productAtom);

  const getProduct = async (product_id: number): Promise<ProductTypes> => {
    const res = await urlInstance.get(`/products/${product_id}/`);
    return res.data;
  };

  const { isLoading } = useQuery(
    ['product', product_id],
    () => getProduct(product_id),
    {
      onSuccess: (data) => {
        setProductData(data);
      },
    },
  );

  return {
    productData: productData,
    isproductLoading: isLoading,
  };
};
