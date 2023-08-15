import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import getCartList from 'src/api/Cart/getCartList';
import postAddCart from 'src/api/Cart/postAddCart';
import { RootState } from 'src/store/store';
import { getProductData } from 'src/store/productSlice';
import Modal from '../Modal';
import Button from '../Button';
import PlusIcon from '../../../assets/icon-plus-line.svg';
import MinusIcon from '../../../assets/icon-minus-line.svg';
import {
  ProductCardWrap,
  ImgSection,
  InfoFormSection,
  ProductInfo,
  ProductName,
  ProductForm,
  ProductQuantitySelection,
  ProductTotalAmount,
  SubmitButtonWrap,
} from './ProductDetailCardStyle';

export interface ProductDetailCardProps {}

const ProductDetailCard: React.FC<ProductDetailCardProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const productId = location.state;
  const dispatch = useDispatch<any>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [modalType, setModalType] = useState<string>('moveCart');

  const productData = useSelector(
    (state: RootState) => state.product.productData,
  );
  const loading = useSelector((state: RootState) => state.product.loading);
  useEffect(() => {
    dispatch(getProductData(productId)); // createAsyncThunk로 비동기 요청 수행
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);
  const stock = Number(productData?.stock);

  const handleAddCart = async () => {
    const cartList = await getCartList();
    const checkItem = cartList.some(
      (item: any) => item.product_id === productId,
    );
    const data = {
      product_id: productId,
      quantity: quantity,
      check: checkItem,
    };
    const res = await postAddCart(data);
    if (res?.status === 406) {
      setModalType('addCartError');
    }

    setIsOpen(true);
  };

  const handleAcceptBtn = async () => {
    if (modalType === 'moveCart') {
      navigate('/cart');
    } else {
      navigate('/');
    }
  };

  const handleQuantityDec = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleQuantityInc = () => {
    if (quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  return (
    <>
      {productData !== null && !loading && (
        <ProductCardWrap>
          <h1 className='a11y-hidden'>상품 상세 정보</h1>
          <ImgSection>
            <img
              aria-label='상품 이미지'
              src={productData.image}
              alt={`${productData.product_name} 이미지`}
            />
          </ImgSection>

          <InfoFormSection>
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
                  <button type='button' onClick={handleQuantityDec}>
                    <img src={MinusIcon} alt='감소 버튼' />
                  </button>
                  <p>{quantity}</p>
                  <button type='button' onClick={handleQuantityInc}>
                    <img src={PlusIcon} alt='증가 버튼' />
                  </button>
                </div>
                <p>현재 재고 : {stock > 0 ? `${stock}개` : '0개(품절)'}</p>
              </ProductQuantitySelection>
              <ProductTotalAmount>
                <h3>총 상품 금액</h3>
                <div>
                  <p>
                    총 수량 <span>{quantity}</span>개
                  </p>
                  <p>
                    <span>
                      {(quantity * productData.price).toLocaleString()}
                    </span>
                    원
                  </p>
                </div>
              </ProductTotalAmount>
              <SubmitButtonWrap>
                <Button width='416px' fontWeight='400'>
                  바로 구매
                </Button>
                <Button
                  onClick={handleAddCart}
                  width='200px'
                  fontWeight='400'
                  $bgColor='var(--sub-font-color )'
                >
                  장바구니
                </Button>
              </SubmitButtonWrap>
            </ProductForm>
          </InfoFormSection>

          {isOpen && (
            <Modal
              type={modalType}
              setIsOpen={setIsOpen}
              acceptBtnClick={handleAcceptBtn}
            />
          )}
        </ProductCardWrap>
      )}
    </>
  );
};

export default ProductDetailCard;
