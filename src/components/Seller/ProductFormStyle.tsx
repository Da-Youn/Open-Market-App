import styled from 'styled-components';

const ProductFormWrap = styled.section`
  width: 100%;
`;
const ProductFormBox = styled.form`
  & > div {
    width: 100%;
    display: flex;
    gap: 30px;
    margin-bottom: 40px;
  }

  label,
  label + div {
    p {
      color: var(--sub-font-color);
      margin-bottom: 10px;
    }
  }

  input:focus {
    border: 1.5px solid var(--main-color);
  }
`;
const ProductImgBox = styled.label`
  position: relative;

  div {
    width: 454px;
    height: 454px;
    background: #c4c4c4;
    box-shadow: 0px 1px 2px 0px rgba(118, 118, 118, 0.35);

    button {
      position: absolute;
      bottom: 30px;
      right: 30px;

      input {
        display: none;
      }
    }
  }
`;

const ProductInfoBox = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 16px;

  label {
    div {
    }
  }

  input,
  button {
    width: 100%;
    height: 54px;
    border-radius: 5px;
    border: 1px solid var(--C4C4C4, #c4c4c4);
    padding: 10px 15px;
    box-sizing: border-box;
  }

  // 상품명
  input #product-name {
    width: 100%;
  }

  // 금액,개수 표시 input
  label[for='price'],
  label[for='shipping-fee'],
  label[for='stock'] {
    position: relative;
    max-width: 220px;
  }

  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  input[type='number'] + span {
    width: 54px;
    height: 54px;
    position: absolute;
    right: 0px;
    bottom: 0px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;

    color: var(--white);
    background-color: var(--border-color);
    border-radius: 0 5px 5px 0;
    border: 1.5px solid var(--border-color);
  }

  input[type='number']:focus + span {
    border-width: 1.5px 1.5px 1.5px 0;
    border-style: solid;
    border-color: var(--main-color);
  }
`;

// 배송방법 radio 커스텀
const RadioInput = styled.div`
  display: flex;
  gap: 10px;
  input {
    display: none;
  }

  label {
    cursor: pointer;
    width: 220px;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sub-font-color);
    border-radius: 5px;
    border: 1px solid var(--border-color);
  }
  input:checked + label {
    background-color: var(--main-color);
    color: var(--white);
  }
`;

const ProductDescBox = styled.div`
  label {
    width: 100%;
  }
  textarea {
    resize: none;
    width: 100%;
    height: 300px;
    padding: 15px;
    border-radius: 5px;
    outline-width: 1.5px;
    outline-color: var(--main-color);
    background: var(--sub-color);
    border: 1px solid var(--border-color);
  }
  textarea:focus {
  }
`;

const ProductBtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    width: 200px;
  }
`;

export {
  ProductFormWrap,
  ProductFormBox,
  ProductImgBox,
  ProductInfoBox,
  RadioInput,
  ProductDescBox,
  ProductBtnBox,
};
