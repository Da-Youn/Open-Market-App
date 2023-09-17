import { ReactNode, MouseEventHandler } from 'react';
import styled from 'styled-components';

import Button from './Button';
import DeleteIcon from '../../assets/icon-delete.svg';

export interface ModalProps {
  children?: ReactNode;
  acceptBtnClick?: MouseEventHandler<HTMLButtonElement>;
  type: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = (props: ModalProps) => {
  const typeData =
    props.type === 'moveCart'
      ? {
          desc: (
            <p>
              장바구니에 상품이 정상적으로 담겼습니다.
              <br />
              장바구니로 이동하시겠습니까?
            </p>
          ),
          cancel: '쇼핑 계속하기',
          accept: '장바구니 이동',
        }
      : props.type === 'editCart'
      ? {
          desc: props.children,
          cancel: '취소',
          accept: '수정',
        }
      : props.type === 'deleteProduct'
      ? {
          desc: <p>상품을 삭제하시겠습니까?</p>,
          cancel: '취소',
          accept: '확인',
        }
      : props.type === 'checkLogin'
      ? {
          desc: (
            <p>
              로그인이 필요한 서비스입니다.
              <br />
              로그인 하시겠습니까?
            </p>
          ),
          cancel: '아니오',
          accept: '예',
        }
      : props.type === 'outOfStockError'
      ? {
          desc: (
            <p>
              원하는 상품의 재고가 없어요.
              <br />
              다른 상품을 살펴보시는 건 어떨까요?
            </p>
          ),
          cancel: '아니오',
          accept: '다른 상품 보기',
        }
      : props.type === 'lackOfStockError'
      ? {
          desc: (
            <p>
              이미 장바구니에 담긴 수량은
              <br />
              현재 재고 수량을 초과할 수 없습니다.
            </p>
          ),
          cancel: '확인',
          accept: '다른 상품 보기',
        }
      : {};

  const handleModalClose = () => {
    props.setIsOpen(false);
  };

  const handleCancelBtn = () => {
    props.setIsOpen(false);
  };

  return (
    <ModalWrap>
      {typeData.desc}
      <ModalBtnWrap>
        <Button
          onClick={handleCancelBtn}
          width='120px'
          $bgColor='var(--white)'
          color='var(--sub-font-color)'
          $border='1px solid var(--border-color)'
          fontWeight='400'
          $padding='10px 0'
          fontSize='var(--font-sm)'
        >
          {typeData.cancel}
        </Button>
        <Button
          onClick={props.acceptBtnClick}
          width='120px'
          fontWeight='400'
          $padding='10px 0'
          fontSize='var(--font-sm)'
        >
          {typeData.accept}
        </Button>
      </ModalBtnWrap>
      <DeleteBtn onClick={handleModalClose}>
        <img src={DeleteIcon} alt='' />
      </DeleteBtn>
    </ModalWrap>
  );
};

export const ModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: normal;
  padding-top: 10px;
  box-sizing: border-box;
  gap: 30px;
  width: 360px;
  height: 220px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-radius: 10px;
  background: var(--white);
  border: 1px solid var(--border-color);
`;

const ModalBtnWrap = styled.div`
  display: flex;
  gap: 10px;

  button:first-child {
  }
`;

const DeleteBtn = styled.button`
  position: absolute;
  top: 18px;

  right: 18px;
  width: 18px;
  height: 18px;
  img {
    width: 100%;
    height: 100%;
  }
`;

export default Modal;
