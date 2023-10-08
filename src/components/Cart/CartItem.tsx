import { useState, useEffect } from 'react';
import styled from 'styled-components';

import Modal from '../common/Modal';
import Button from '../common/Button';
import QuantityButton from '../common/QuantityButton';

import { usePutCart } from 'src/hooks/useCart';
import { useDeleteCart } from 'src/hooks/useCart';
import { useGetProduct } from 'src/hooks/useProduct';

import { QuantityButtonWrapper } from '../common/QuantityButton';
import DeleteIcon from '../../assets/icon-delete.svg';
import PlusIcon from '../../assets/icon-plus-line.svg';
import MinusIcon from '../../assets/icon-minus-line.svg';
import CheckBoxIcon from '../../assets/check-box(circle).svg';
import CheckBoxFilledIcon from '../../assets/check-fill-box(circle).svg';

type AmountType = {
  [key: number]: number;
};

interface CartItemProps {
  key: number;
  cartItem: any;
  isAllChecked: boolean | null;
  setIsAllChecked: React.Dispatch<React.SetStateAction<boolean | null>>;
  itemAmount: AmountType;
  setItemAmount: React.Dispatch<React.SetStateAction<AmountType>>;
}

const CartItem = ({
  cartItem,
  isAllChecked,
  setIsAllChecked,
  itemAmount,
  setItemAmount,
}: CartItemProps) => {
  const itemDetail = useGetProduct(cartItem.product_id).productData;

  const [quantity, setQuantity] = useState<number>(cartItem.quantity);
  const [checkBox, setCheckBox] = useState<string>(CheckBoxIcon);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('');
  const [btnType, setBtnType] = useState<string>('');
  const usePutCartMutate = usePutCart(cartItem.cart_item_id);
  const useDeleteCartMutate = useDeleteCart();

  //장바구니 수량 변경
  useEffect(() => {
    if (isAllChecked === false) {
      setItemAmount({});
      setCheckBox(CheckBoxIcon);
    } else if (isAllChecked === true) {
      setCheckBox(CheckBoxFilledIcon);
      AddAmount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAllChecked]);

  useEffect(() => {
    if (checkBox === CheckBoxFilledIcon) {
      AddAmount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  // 체크 박스 활성화
  const handleCheckBoxActive = () => {
    if (checkBox === CheckBoxIcon) {
      AddAmount();
    } else if (checkBox === CheckBoxFilledIcon) {
      DeleteAmount();
    }
  };

  // 체크 시 : 가격 추가하기
  const AddAmount = () => {
    if (itemDetail.price && itemDetail.product_id) {
      const totalAmount = quantity * itemDetail.price;
      setItemAmount((prev) => ({
        ...prev,
        [itemDetail.product_id]: totalAmount,
      }));
      setCheckBox(CheckBoxFilledIcon);
    }
  };

  // 체크 시 : 가격 삭제하기
  const DeleteAmount = () => {
    if (itemDetail) {
      const newData: AmountType = { ...itemAmount };
      delete newData[itemDetail && itemDetail.product_id];
      setItemAmount(newData);
      setCheckBox(CheckBoxIcon);
    }
  };

  // 타입별 모달 오픈
  const handleEditModalOpen = () => {
    setModalOpen(true);
    setModalType('editCart');
  };

  const handleDeleteModalOpen = () => {
    setModalOpen(true);
    setModalType('deleteCart');
  };

  // 장바구니 수량 변경
  const handleEditBtn = async () => {
    try {
      const response = await usePutCartMutate.mutateAsync({
        product_id: cartItem.product_id,
        quantity: quantity,
        is_active: false,
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
  const HandleDeleteBtn = async () => {
    try {
      const response = await useDeleteCartMutate.mutateAsync(
        cartItem.cart_item_id,
      );

      if (response) {
        // 선택상태에서 총금액에 포함된 상품 가격 제거
        const newData: AmountType = { ...itemAmount };
        delete newData[itemDetail && cartItem.product_id];
        setItemAmount(newData);
        setModalOpen(false);
      }
    } catch (error) {
      // 예외 메시지를 이용해 모달 타입 설정
      console.error(error);
    }
  };

  return (
    <CartItemLayout>
      <CheckBtn onClick={handleCheckBoxActive}>
        <p className='a11y-hidden'>상품 선택 버튼</p>
        <img src={checkBox} alt='상품 선택 버튼 이미지' />
      </CheckBtn>
      <CartItemImg src={itemDetail.image} alt='' />
      <CartItemInfo>
        <div>
          <p>{itemDetail.store_name}</p>
          <h3>{itemDetail.product_name}</h3>
          <strong>{itemDetail.price.toLocaleString()}원</strong>
        </div>
        <span>택배배송 / 무료배송</span>
      </CartItemInfo>
      <div>
        <QuantityButtonWrapper>
          <button type='button' onClick={handleEditModalOpen}>
            <img src={MinusIcon} alt='감소 버튼' />
          </button>
          <p>{quantity}</p>
          <button type='button' onClick={handleEditModalOpen}>
            <img src={PlusIcon} alt='증가 버튼' />
          </button>
        </QuantityButtonWrapper>
      </div>
      <CartItemAmount>
        <strong>{(quantity * itemDetail.price).toLocaleString()}원</strong>
        <Button
          width='130px'
          fontWeight='400'
          fontSize='var(--font-sm)'
          $padding='10px'
        >
          주문하기
        </Button>
      </CartItemAmount>
      <DeleteBtn type='button' onClick={handleDeleteModalOpen}>
        <img src={DeleteIcon} alt='삭제 버튼 이미지' />
      </DeleteBtn>
      {modalOpen && modalType === 'editCart' && (
        <Modal
          type={modalType}
          setModalOpen={setModalOpen}
          acceptBtnClick={handleEditBtn}
        >
          <QuantityButton
            stock={itemDetail.stock}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </Modal>
      )}
      {modalOpen && modalType === 'deleteCart' && (
        <Modal
          type={modalType}
          setModalOpen={setModalOpen}
          acceptBtnClick={HandleDeleteBtn}
        />
      )}
      {modalOpen && modalType === 'deleteComplete' && (
        <Modal type={modalType} setModalOpen={setModalOpen} />
      )}
    </CartItemLayout>
  );
};

const CartItemLayout = styled.li`
  position: relative;
  width: 100%;
  min-height: 200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 2px solid var(--sub-border-color);
`;
const CheckBtn = styled.button`
  padding: 0 20px 0 30px;
`;

const CartItemImg = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 10px;
`;

const CartItemInfo = styled.div`
  min-width: 200px;
  width: 430px;
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

const CartItemAmount = styled.div`
  width: 100%;
  max-width: 300px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;

  strong {
    font-size: var(--font-md);
    font-weight: 700;
    color: var(--error-color);
  }
`;

const DeleteBtn = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
`;
export default CartItem;
