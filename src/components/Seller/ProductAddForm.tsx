import { useRef, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { usePostProduct, ProductReq } from 'src/hooks/useProduct';

import Button from 'src/components/common/Button';

import ImgUploadIcon from 'src/assets/icon-img.svg';

import {
  ProductFormWrap,
  ProductFormBox,
  ProductImgBox,
  ProductInfoBox,
  RadioInput,
  ProductDescBox,
  ProductBtnBox,
} from './ProductFormStyle';

type ProductImageProps = {
  display: string;
};

const ProductAddForm = () => {
  // console.log(data);
  const navigate = useNavigate();
  const usePostProductMutate = usePostProduct();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>('');
  const [inputValues, setInputValues] = useState<ProductReq>({
    product_name: '',
    image: null,
    price: 0,
    shipping_method: '',
    shipping_fee: 0,
    stock: 0,
    product_info: '',
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value.trim(),
    }));
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click(); // Check if fileInputRef.current exists before trying to access its properties
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: file,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.readyState === 2) {
        setImage(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveBtnClick = async () => {
    try {
      const response = await usePostProductMutate.mutateAsync(inputValues);
      if (response) {
        alert('상품이 등록되었습니다.');
        navigate(`/seller/dashboard`);
      }
    } catch (error: any) {
      // 예외 메시지를 이용해 모달 타입 설정
      console.error(error);
    }
  };

  return (
    <ProductFormWrap>
      <h3 className='a11y-hidden'>상품 등록 폼</h3>
      <ProductFormBox>
        <div>
          <ProductImgBox htmlFor='image'>
            <p>상품 이미지</p>
            <div>
              <ProductImage
                src={image}
                alt='상품 이미지'
                display={image ? 'block' : 'none'}
              />
              <button type='button' onClick={handleImageUpload}>
                <img src={ImgUploadIcon} alt='이미지 업로드 버튼' />
                <input
                  type='file'
                  id='image'
                  name='image'
                  accept='image/jpg, image/jpeg, image/png'
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
              </button>
            </div>
          </ProductImgBox>
          <ProductInfoBox>
            <label>
              <p>상품명</p>
              <input
                type='text'
                id='product-name'
                name='product_name'
                onChange={handleInputChange}
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
                />
                <span>원</span>
              </div>
            </label>

            <div>
              <p>배송방법</p>
              <RadioInput>
                <input
                  type='radio'
                  name='shipping_method'
                  id='shipping-method1'
                  value='PARCEL'
                  onChange={handleInputChange}
                />
                <label htmlFor='shipping-method1'>택배, 소포, 등기</label>
                <input
                  type='radio'
                  name='shipping_method'
                  id='shipping-method2'
                  value='DELIVERY'
                  onChange={handleInputChange}
                />
                <label htmlFor='shipping-method2'>직접배송(화물배달)</label>
              </RadioInput>
            </div>

            <label htmlFor='shipping-fee'>
              <p>기본 배송비</p>
              <div>
                <input
                  type='number'
                  id='shipping-fee'
                  name='shipping_fee'
                  onChange={handleInputChange}
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
                />
                <span>개</span>
              </div>
            </label>
          </ProductInfoBox>
        </div>
        <ProductDescBox>
          <label htmlFor='product-info'>
            <p>상품 상세 정보</p>
            <textarea
              id='product-info'
              name='product_info'
              onChange={handleInputChange}
            />
          </label>
        </ProductDescBox>
        <ProductBtnBox>
          <Button
            color='var(--sub-font-color)'
            $bgColor='var(--white)'
            $border='1px solid var(--sub-font-color)'
          >
            취소
          </Button>
          <Button onClick={handleSaveBtnClick} width='200px'>
            저장하기
          </Button>
        </ProductBtnBox>
      </ProductFormBox>
    </ProductFormWrap>
  );
};

const ProductImage = styled.img<ProductImageProps>`
  display: ${(props: { display: string }) => props.display};
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 0 0;
`;

export default ProductAddForm;
