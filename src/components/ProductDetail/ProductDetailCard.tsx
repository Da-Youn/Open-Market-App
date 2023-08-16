import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import postAddCart from 'src/api/Cart/postAddCart';
import { RootState } from 'src/store/store';
import { getProductData } from 'src/store/productSlice';
import { getCartListData } from 'src/store/cartListSlice';
import Modal from '../common/Modal';
import Button from '../common/Button';
import PlusIcon from '../../assets/icon-plus-line.svg';
import MinusIcon from '../../assets/icon-minus-line.svg';
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
  const cartListData = useSelector(
    (state: RootState) => state.cartList.cartListData?.results,
  );

  const loading = useSelector((state: RootState) => state.product.loading);
  useEffect(() => {
    dispatch(getProductData(productId));
    dispatch(getCartListData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);
  const stock = Number(productData?.stock);

  const handleAddCart = async () => {
    const checkItem = cartListData?.some(
      (item: any) => item.product_id === productId,
    );
    const data = {
      product_id: productId,
      quantity: quantity,
      check: checkItem,
    };
    const res = await postAddCart(data);
    if (res?.status === 406) {
      if (
        res?.data.FAIL_message ===
        '현재 재고보다 더 많은 수량을 담을 수 없습니다.'
      ) {
        setModalType('lackOfStockError');
      } else {
        setModalType('outOfStockError');
      }
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
                  <button
                    type='button'
                    onClick={handleQuantityDec}
                    disabled={stock > 0 ? false : true}
                  >
                    <img src={MinusIcon} alt='감소 버튼' />
                  </button>
                  <p>{quantity}</p>
                  <button
                    type='button'
                    onClick={handleQuantityInc}
                    disabled={stock > 0 ? false : true}
                  >
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
                <Button
                  width='416px'
                  fontWeight='400'
                  disabled={stock > 0 ? false : true}
                >
                  바로 구매
                </Button>
                <Button
                  onClick={handleAddCart}
                  width='200px'
                  fontWeight='400'
                  $bgColor='var(--sub-font-color )'
                  disabled={stock > 0 ? false : true}
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
