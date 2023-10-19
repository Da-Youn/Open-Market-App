import styled from 'styled-components';

import Button from 'src/components/common/Button';

import ImgUploadIcon from 'src/assets/icon-img.svg';

export interface ProductAddFormProps {}

const ProductAddForm = (props: ProductAddFormProps) => {
  return (
    <ProductAddFormWrap>
      <h3 className='a11y-hidden'>상품 등록 폼</h3>
      <ProductAddFormBox>
        <div>
          <ProductAddImgBox htmlFor='image'>
            <p>상품 이미지</p>
            <div>
              <img src='' alt='상품 이미지' />
              <button>
                <img src={ImgUploadIcon} alt='이미지 업로드 버튼' />
                <input type='file' id='image' accept='image/*' />
              </button>
            </div>
          </ProductAddImgBox>
          <ProductAddInfoBox>
            <label htmlFor='product-name'>
              <p>상품명</p>
              <input type='text' id='product-name' />
            </label>
            <label htmlFor='price'>
              <p>판매가</p>
              <div>
                <input type='number' id='price' /> <span>원</span>
              </div>
            </label>

            <label htmlFor='shipping-method'>
              <p>배송방법</p>
              <RadioInput>
                <input
                  type='radio'
                  name='shipping-method'
                  id='shipping-method1'
                  checked
                />
                <label htmlFor='shipping-method1'>택배, 소포, 등기</label>
                <input
                  type='radio'
                  name='shipping-method'
                  id='shipping-method2'
                />
                <label htmlFor='shipping-method2'>직접배송(화물배달)</label>
              </RadioInput>
            </label>

            <label htmlFor='shipping-fee'>
              <p>기본 배송비</p>
              <div>
                <input type='number' id='shipping-fee' /> <span>원</span>
              </div>
            </label>
            <label htmlFor='stock'>
              <p>재고</p>
              <div>
                <input type='number' id='stock' /> <span>개</span>
              </div>
            </label>
          </ProductAddInfoBox>
        </div>
        <ProductAddDescBox>
          <label htmlFor='product-info'>
            <p>상품 상세 정보</p>
            <textarea id='product-info' />
          </label>
        </ProductAddDescBox>
        <ProductAddBtnBox>
          <Button
            color='var(--sub-font-color)'
            $bgColor='var(--white)'
            $border='1px solid var(--sub-font-color)'
          >
            취소
          </Button>
          <Button width='200px'>저장하기</Button>
        </ProductAddBtnBox>
      </ProductAddFormBox>
    </ProductAddFormWrap>
  );
};

const ProductAddFormWrap = styled.section`
  width: 100%;
`;
const ProductAddFormBox = styled.form`
  & > div {
    width: 100%;
    display: flex;
    gap: 30px;
    margin-bottom: 40px;
  }

  label {
    p {
      color: var(--sub-font-color);
      margin-bottom: 10px;
    }
  }

  input:focus {
    border: 1.5px solid var(--main-color);
  }
`;
const ProductAddImgBox = styled.label`
  position: relative;
  div {
    width: 454px;
    height: 454px;
    background: #c4c4c4;

    & + img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 0 0;
    }
    button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      input {
        display: none;
      }
    }
  }
`;
const ProductAddInfoBox = styled.div`
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

const ProductAddDescBox = styled.div`
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

const ProductAddBtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    width: 200px;
  }
`;

export default ProductAddForm;
