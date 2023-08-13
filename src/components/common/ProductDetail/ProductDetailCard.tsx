import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductData } from 'src/store/productSlice';
import { RootState } from 'src/store/store';
import Button from '../Button';
import PlusIcon from '../../../assets/icon-plus-line.svg';
import MinusIcon from '../../../assets/icon-minus-line.svg';
import {
  ProductCardWrap,
  InfoFormSecrion,
  ProductInfo,
  ProductName,
  ProductForm,
  ProductQuantitySelection,
  ProductTotalAmount,
  SubmitButtonWrap,
} from './ProductDetailCardStyle';

export interface ProductDetailCardProps {}

const ProductDetailCard: React.FC<ProductDetailCardProps> = () => {
  const location = useLocation();
  const postId = location.state.toString();
  const dispatch = useDispatch<any>();

  const productData = useSelector(
    (state: RootState) => state.product.productData,
  );

  const loading = useSelector((state: RootState) => state.product.loading);

  useEffect(() => {
    dispatch(getProductData(postId)); // createAsyncThunk로 비동기 요청 수행

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  return (
    <>
      {productData !== null && !loading && (
        <ProductCardWrap>
          <h1 className='a11y-hidden'>상품 상세 정보</h1>
          <div>
            <img
              aria-label='상품 이미지'
              src={productData.image}
              alt={`${productData.product_name} 이미지`}
            />
          </div>

          <InfoFormSecrion>
            <ProductInfo>
              <h2 className='a11y-hidden'>상품 정보</h2>
              <p aria-label='스토어 이름'>{productData.store_name}</p>
              <ProductName aria-label='상품 이름'>
                <strong>{productData.product_name}</strong>
              </ProductName>
              <p aria-label='상품 가격'>
                <strong>{productData.price.toLocaleString()}</strong>원
              </p>
            </ProductInfo>

            <ProductForm>
              <h2 className='a11y-hidden'>구매하기</h2>
              <p>택배배송 / 무료배송</p>
              <ProductQuantitySelection>
                <h3 className='a11y-hidden'>수량 선택</h3>
                <div>
                  <button>
                    <img src={MinusIcon} alt='감소 버튼' />
                  </button>
                  <p>1</p>
                  <button>
                    <img src={PlusIcon} alt='증가 버튼' />
                  </button>
                </div>
              </ProductQuantitySelection>
              <ProductTotalAmount>
                <h3>총 상품 금액</h3>
                <div>
                  <p>
                    총 수량 <span>1</span>개
                  </p>
                  <p>
                    <span>{productData.price.toLocaleString()}</span>원
                  </p>
                </div>
              </ProductTotalAmount>
              <SubmitButtonWrap>
                <Button width='416px' fontWeight='400'>
                  바로 구매
                </Button>
                <Button
                  width='200px'
                  fontWeight='400'
                  $bgColor='var(--sub-font-color )'
                >
                  장바구니
                </Button>
              </SubmitButtonWrap>
            </ProductForm>
          </InfoFormSecrion>
        </ProductCardWrap>
      )}
    </>
  );
};

export default ProductDetailCard;
