import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { usePostCart } from 'src/hooks/useCart';
import { useGetProduct } from 'src/hooks/useProduct';

import Modal from '../common/Modal';
import Button from '../common/Button';
import QuantityButton from '../common/QuantityButton';
import { getStorageItem } from 'src/util/handleStorageItem';

import * as S from './ProductDetailCardStyle';

const ProductDetailCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const productId = location.state;
  const token = getStorageItem('token');

  const [quantity, setQuantity] = useState<number>(1);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('moveCart');

  const { productData, isProductLoading } = useGetProduct(productId);
  const usePostCartMutate = usePostCart();

  const stock = Number(productData.stock);

  const handleAddCart = async () => {
    if (!token) {
      setModalType('checkLogin');
      setModalOpen(true);
      return;
    }
    try {
      const response = await usePostCartMutate.mutateAsync({
        product_id: productId,
        quantity: quantity,
        is_active: false,
      });
      if (response) {
        setModalOpen(true);
        return response;
      }
    } catch (error: any) {
      // 예외 메시지를 이용해 모달 타입 설정

      if (error.message === 'lackOfStockError') {
        setModalType('lackOfStockError');
      } else if (error.message === 'outOfStockError') {
        setModalType('outOfStockError');
      }
      setModalOpen(true);
    }
  };

  const handleAcceptBtn = async () => {
    if (modalType === 'moveCart') {
      navigate('/my/cart');
    } else if (modalType === 'checkLogin') {
      navigate('/account/login');
    } else {
      navigate('/');
    }
  };

  const handleOrderBtnClick = async () => {
    if (!token) {
      setModalType('checkLogin');
      setModalOpen(true);
      return;
    }
    navigate('/my/order', {
      state: {
        data: {
          order_items: productId,
          order_quantity: quantity,
          price: productData.price * quantity,
          shipping_fee: productData.shipping_fee,
          total_price: quantity * productData.price + productData.shipping_fee,
        },
        order: 'direct_order',
      },
    });
  };

  return (
    productData &&
    !isProductLoading && (
      <S.ProductCardWrap>
        <h1 className='a11y-hidden'>상품 상세 정보</h1>
        <S.ImgSection>
          <img aria-label='상품 이미지' src={productData.image} alt={`${productData.product_name} 이미지`} />
        </S.ImgSection>
        <S.InfoFormSection>
          <S.ProductInfo>
            <h2 className='a11y-hidden'>상품 정보</h2>
            <p aria-label='스토어 이름'>{productData.store_name}</p>
            <S.ProductName aria-label='상품 이름'>
              <strong>{productData.product_name}</strong>
            </S.ProductName>
            <p aria-label='상품 가격'>
              <strong>{productData.price?.toLocaleString()}</strong>원
            </p>
          </S.ProductInfo>

          <S.ProductForm>
            <h2 className='a11y-hidden'>구매하기</h2>
            <p>
              택배배송 /
              {productData.shipping_fee?.toLocaleString()
                ? `${productData.shipping_fee?.toLocaleString()}원`
                : '무료배송'}
            </p>
            <S.ProductQuantitySelection>
              <h3 className='a11y-hidden'>수량 선택</h3>
              <QuantityButton stock={stock} quantity={quantity} setQuantity={setQuantity} />
              <p>현재 재고 : {stock > 0 ? `${stock}개` : '0개(품절)'}</p>
            </S.ProductQuantitySelection>
            <S.ProductTotalAmount>
              <h3>총 상품 금액</h3>
              <div>
                <p>
                  총 수량 <span>{quantity}</span>개
                </p>
                <p>
                  <span>{(quantity * productData.price)?.toLocaleString()}</span>원
                </p>
              </div>
            </S.ProductTotalAmount>
            <S.SubmitButtonWrap>
              <Button width='416px' fontWeight='400' disabled={stock > 0 ? false : true} onClick={handleOrderBtnClick}>
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
            </S.SubmitButtonWrap>
          </S.ProductForm>
        </S.InfoFormSection>

        {modalOpen && <Modal type={modalType} setModalOpen={setModalOpen} acceptBtnClick={handleAcceptBtn} />}
      </S.ProductCardWrap>
    )
  );
};

export default ProductDetailCard;
