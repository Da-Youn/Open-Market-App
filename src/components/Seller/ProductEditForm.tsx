import { useState, ChangeEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePutProduct, ProductReq } from 'src/hooks/useProduct';

import Button from 'src/components/common/Button';

import * as S from './ProductFormStyle';

const ProductEditForm = () => {
  const data = useLocation().state;
  const navigate = useNavigate();
  const usePutProductMutate = usePutProduct(data.product_id);

  const [inputValues, setInputValues] = useState<ProductReq>({
    product_name: data.product_name,
    price: data.price,
    shipping_method: data.shipping_method,
    shipping_fee: data.shipping_fee,
    stock: data.stock,
    product_info: data.product_info,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value.trim(),
    }));
  };

  const handleSaveBtnClick = async () => {
    try {
      const response = await usePutProductMutate.mutateAsync(inputValues);
      if (response) {
        alert('상품이 수정되었습니다.');
        navigate(`/seller/dashboard`);
      }
    } catch (error: any) {
      // 예외 메시지를 이용해 모달 타입 설정
      console.error(error);
    }
  };

  return (
    <S.ProductFormWrap>
      <h3 className='a11y-hidden'>상품 등록 폼</h3>
      <S.ProductFormBox>
        <div>
          <S.ProductInfoBox>
            <label htmlFor='product-name'>
              <p>상품명</p>
              <input
                type='text'
                id='product-name'
                name='product_name'
                onChange={handleInputChange}
                value={data && inputValues.product_name}
              />
            </label>
            <label htmlFor='price'>
              <p>판매가</p>
              <div>
                <input
                  type='number'
                  id='price'
                  name='price'
                  onChange={handleInputChange}
                  value={data && inputValues.price}
                />
                <span>원</span>
              </div>
            </label>

            <div>
              <p>배송방법</p>
              <S.RadioInput>
                <input
                  type='radio'
                  name='shipping_method'
                  id='shipping-method1'
                  value='PARCEL'
                  onChange={handleInputChange}
                  checked={data && inputValues.shipping_method === 'PARCEL'}
                />
                <label htmlFor='shipping-method1'>택배, 소포, 등기</label>
                <input
                  type='radio'
                  name='shipping_method'
                  id='shipping-method2'
                  value='DELIVERY'
                  onChange={handleInputChange}
                  checked={data && inputValues.shipping_method === 'DELIVERY'}
                />
                <label htmlFor='shipping-method2'>직접배송(화물배달)</label>
              </S.RadioInput>
            </div>

            <label htmlFor='shipping-fee'>
              <p>기본 배송비</p>
              <div>
                <input
                  type='number'
                  id='shipping-fee'
                  name='shipping_fee'
                  onChange={handleInputChange}
                  value={data && inputValues.shipping_fee}
                />
                <span>원</span>
              </div>
            </label>
            <label htmlFor='stock'>
              <p>재고</p>
              <div>
                <input
                  type='number'
                  id='stock'
                  name='stock'
                  onChange={handleInputChange}
                  value={data && inputValues.stock}
                />
                <span>개</span>
              </div>
            </label>
          </S.ProductInfoBox>
        </div>
        <S.ProductDescBox>
          <label htmlFor='product-info'>
            <p>상품 상세 정보</p>
            <textarea
              id='product-info'
              name='product_info'
              onChange={handleInputChange}
              value={data && inputValues.product_info}
            />
          </label>
        </S.ProductDescBox>
        <S.ProductBtnBox>
          <Button color='var(--sub-font-color)' $bgColor='var(--white)' $border='1px solid var(--sub-font-color)'>
            취소
          </Button>
          <Button onClick={handleSaveBtnClick} width='200px'>
            저장하기
          </Button>
        </S.ProductBtnBox>
      </S.ProductFormBox>
    </S.ProductFormWrap>
  );
};

export default ProductEditForm;
