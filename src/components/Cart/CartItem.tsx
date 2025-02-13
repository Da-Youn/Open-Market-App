import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { usePutCart } from 'src/hooks/useCart';
import { useDeleteCart } from 'src/hooks/useCart';
import { useGetProduct } from 'src/hooks/useProduct';

import Modal from '../common/Modal';
import Button from '../common/Button';
import { media } from 'src/style/mediaQuery';
import QuantityButton from '../common/QuantityButton';

import { QuantityButtonBox } from '../common/QuantityButton';
import DeleteIcon from '../../assets/icon-delete.svg';
import PlusIcon from '../../assets/icon-plus-line.svg';
import MinusIcon from '../../assets/icon-minus-line.svg';
import CheckBoxIcon from '../../assets/check-box(circle).svg';
import CheckBoxFilledIcon from '../../assets/check-fill-box(circle).svg';

export type SelectedItemType = {
  amount: number;
  quantity: number;
  shipFee: number;
};

interface SelectedItem {
  [key: number]: SelectedItemType;
}
interface CartItemProps {
  key: number;
  cartItem: any;
  isAllChecked: boolean | null;
  setIsAllChecked: React.Dispatch<React.SetStateAction<boolean | null>>;

  selectedItem: SelectedItem;
  setSelectedItem: React.Dispatch<React.SetStateAction<SelectedItem>>;
}

const CartItem = ({
  cartItem,
  isAllChecked,
  setIsAllChecked,

  selectedItem,
  setSelectedItem,
}: CartItemProps) => {
  const navigate = useNavigate();
  const { productData: itemDetail, isProductLoading } = useGetProduct(cartItem.product_id);
  const [quantity, setQuantity] = useState<number>(cartItem.quantity);
  const [isActive, setIsActive] = useState<boolean>(cartItem.is_active);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('');
  const usePutCartMutate = usePutCart(cartItem.cart_item_id);
  const useDeleteCartMutate = useDeleteCart();

  useEffect(() => {
    handleSetActiveItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!isProductLoading]);

  // 첫 렌더링 시 장바구니 수량 변경
  useEffect(() => {
    if (isAllChecked === false) {
      DeleteAmount();
      setSelectedItem({});
    } else if (isAllChecked === true) {
      AddAmount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAllChecked]);

  // 수량 변경 시 isActive === true인 상품이라면 업데이트
  useEffect(() => {
    if (isActive) {
      AddAmount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  // 체크 박스 활성화
  const handleCheckBoxActive = () => {
    if (!isActive) {
      AddAmount();
    } else if (isActive) {
      DeleteAmount();
    }
  };

  const handleSetActiveItem = () => {
    if (itemDetail.price && itemDetail.product_id) {
      setSelectedItem((prev) => ({
        ...prev,
        [itemDetail.product_id]: {
          amount: quantity * itemDetail.price,
          quantity,
          shipFee: itemDetail.shipping_fee,
        },
      }));
      setIsActive(true);
    }
  };

  // 체크 시 : 가격 추가하기
  const AddAmount = async () => {
    handleSetActiveItem();
    try {
      await usePutCartMutate.mutateAsync({
        product_id: cartItem.product_id,
        quantity: quantity,
        is_active: true,
      });
    } catch (error: any) {
      console.error(error);
    }
  };

  // 체크 시 : 가격 삭제하기
  const DeleteAmount = async () => {
    if (itemDetail) {
      const newData: SelectedItem = { ...selectedItem };
      delete newData[itemDetail && itemDetail.product_id];
      setSelectedItem(newData);
      setIsActive(false);
    }
    try {
      await usePutCartMutate.mutateAsync({
        product_id: cartItem.product_id,
        quantity: quantity,
        is_active: false,
      });
    } catch (error: any) {
      console.error(error);
    }
  };

  // 타입별 모달 오픈
  const handleEditModalOpen = () => {
    setModalOpen(true);
    setModalType('editCart');
  };

  const handleDeleteModalOpen = () => {
    setModalOpen(true);
    setModalType('deleteProduct');
  };

  // 장바구니 수량 변경
  const handleEditBtn = async () => {
    try {
      const response = await usePutCartMutate.mutateAsync({
        product_id: cartItem.product_id,
        quantity: quantity,
        is_active: isActive,
      });

      if (response) {
        setModalOpen(false);
      }
    } catch (error: any) {
      // 예외 메시지를 이용해 모달 타입 설정
      console.log(error);
    }
  };

  // 장바구니 상품 삭제
  const handleDeleteBtn = async () => {
    try {
      const response = await useDeleteCartMutate.mutateAsync(cartItem.cart_item_id);

      if (response) {
        // 선택상태에서 총금액에 포함된 상품 가격 제거
        const newData: SelectedItem = { ...selectedItem };
        delete newData[itemDetail && cartItem.product_id];
        setSelectedItem(newData);
        setModalOpen(false);
      }
    } catch (error) {
      // 예외 메시지를 이용해 모달 타입 설정
      console.error(error);
    }
  };

  const handleOrderBtnClick = () => {
    navigate('/my/order', {
      state: {
        data: {
          order_items: cartItem.product_id,
          order_quantity: cartItem.quantity,
          price: itemDetail.price * cartItem.quantity,
          shipping_fee: itemDetail.shipping_fee,
          total_price: quantity * itemDetail.price + itemDetail.shipping_fee,
        },
        order: 'cart_one_order',
      },
    });
  };

  return (
    itemDetail.image &&
    !isProductLoading && (
      <CartItemLayout>
        <CheckBtn onClick={handleCheckBoxActive}>
          <p className='a11y-hidden'>상품 선택 버튼</p>
          <img src={isActive === true ? CheckBoxFilledIcon : CheckBoxIcon} alt='상품 선택 버튼 이미지' />
        </CheckBtn>
        <CartItemBox>
          <CartItemInfo>
            <CartItemImg src={itemDetail.image} alt='' />
            <CartItemDesc>
              <div>
                <p>{itemDetail.store_name}</p>
                <h3>{itemDetail.product_name}</h3>
                <strong>{itemDetail.price?.toLocaleString()}원</strong>
              </div>
            </CartItemDesc>
          </CartItemInfo>
          <CartItemAmount>
            <QuantityButtonWrapper>
              <p>주문 수량</p>
              <QuantityButtonBox>
                <button type='button' onClick={handleEditModalOpen}>
                  <img src={MinusIcon} alt='감소 버튼' />
                </button>
                <p>{quantity}</p>
                <button type='button' onClick={handleEditModalOpen}>
                  <img src={PlusIcon} alt='증가 버튼' />
                </button>
              </QuantityButtonBox>
            </QuantityButtonWrapper>
            <CartDelivery>
              <p>배송비</p>
              <strong>
                택배배송 /{itemDetail.shipping_fee ? `${itemDetail.shipping_fee?.toLocaleString()}원` : `무료배송`}
              </strong>
            </CartDelivery>
            <CartSelectedItem>
              <div>
                <p>주문 금액</p>
                <strong>{(quantity * itemDetail.price)?.toLocaleString()}원</strong>
              </div>
              <Button
                width='130px'
                fontWeight='400'
                fontSize='var(--font-sm)'
                $padding='10px'
                onClick={handleOrderBtnClick}
              >
                주문하기
              </Button>
            </CartSelectedItem>
          </CartItemAmount>
        </CartItemBox>
        <DeleteBtn type='button' onClick={handleDeleteModalOpen}>
          <img src={DeleteIcon} alt='삭제 버튼 이미지' />
        </DeleteBtn>
        {modalOpen && modalType === 'editCart' && (
          <Modal type={modalType} setModalOpen={setModalOpen} acceptBtnClick={handleEditBtn}>
            <QuantityButton stock={itemDetail.stock} quantity={quantity} setQuantity={setQuantity} />
          </Modal>
        )}
        {modalOpen && modalType === 'deleteProduct' && (
          <Modal type={modalType} setModalOpen={setModalOpen} acceptBtnClick={handleDeleteBtn} />
        )}
      </CartItemLayout>
    )
  );
};

const CartItemLayout = styled.li`
  position: relative;
  width: 100%;
  min-height: 200px;
  display: flex;

  gap: 20px;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid var(--sub-border-color);
  ${media.desktop(`
    flex-direction: column;
      `)}
`;
const CheckBtn = styled.button`
  width: 20px;
  ${media.desktop(`
    display: flex;
    flex-direction: column;
    align-items: stretch;
      `)}
`;

const CartItemBox = styled.div`
  width: 100%;
  display: flex;

  ${media.desktop(`
    gap: 16px;
      `)}
  ${media.tablet(`
    flex-direction:column;
      `)}
`;
const CartItemInfo = styled.div`
  width: 100%;
  max-width: 500px;
  flex-grow: 0.4;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-right: 1px solid var(--border-color);
  ${media.desktop(`
    border: 0;
    max-width: 100%;
      `)}
`;

const CartItemAmount = styled.div`
  width: 100%;
  max-width: 650px;
  flex-grow: 0.6;
  display: flex;

  align-items: center;

  p {
    font-size: var(--font-xs);
  }
  ${media.desktop(`
    width: 100%;
    max-width: 100%;
    gap: 16px;
    flex-direction: column;
    p {
      font-size: var(--font-sm);
    }
      `)}
`;

const CartItemImg = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 10px;
  object-fit: cover;
  aspect-ratio: 1/1;
  object-position: 50% 0;
  ${media.tablet(`
    width: 120px;
    height: 120px;
      `)}
  @media (max-width: 7380px) {
  }
`;

const CartItemDesc = styled.div`
  width: 100%;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    p {
      font-size: var(--font-xs);
      color: var(--sub-font-color);
    }
    h3 {
      font-size: var(--font-md);
    }
    strong {
      font-size: var(--font-sm);
      font-weight: 700;
    }
  }
  span {
    font-size: var(--font-xs);
    color: var(--sub-font-color);
  }
`;

const FlexColumn = styled.div`
  width: 100%;
  min-width: 120px;
  height: 100%;
  padding: 0 40px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border-right: 1px solid var(--border-color);
  ${media.desktop(`
    width: 100%;
    padding: 0;
    flex-direction: row;
    justify-content: space-between;
    border: 0;
      `)}
`;

const QuantityButtonWrapper = styled(FlexColumn)`
  gap: 12px;
`;
const CartDelivery = styled(FlexColumn)`
  text-align: center;
`;

const CartSelectedItem = styled(FlexColumn)`
  padding: 0 60px;
  border: 0;
  div {
    gap: 6px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  button {
    width: 100%;
  }
  strong {
    font-size: var(--font-md);
    font-weight: 700;
    color: var(--error-color);
  }
  ${media.desktop(`
    padding: 0;
    flex-direction: column;
    div {
      flex-direction: row;
    }
      `)}
`;

const DeleteBtn = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
`;
export default CartItem;
