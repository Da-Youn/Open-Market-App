import styled from 'styled-components';

export const ProductCardWrap = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 50px;
`;
export const ImgSection = styled.div`
  max-width: 600px;
  max-height: 600px;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    object-position: 50% 0;
  }
`;
export const InfoFormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ProductInfo = styled.div`
  font-size: var(--font-md);
  strong {
    font-size: var(--font-xl);
  }

  h2 + p {
    color: var(--sub-font-color);
  }

  strong + p strong {
    font-weight: 700;
  }
`;

export const ProductName = styled.p`
  margin: 16px 0 20px;
`;

export const ProductForm = styled.form`
  h2 + p {
    color: var(--sub-font-color);
  }
`;

export const ProductQuantitySelection = styled.div`
  padding: 30px 0;
  margin: 20px 0 46px;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);

  div {
    width: 150px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    border: 1px solid var(--border-color);
    font-size: var(--font-md);

    button {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 20px;
        height: 20px;
      }
    }

    button,
    p {
      width: 50px;
      text-align: center;
    }
    button:first-child {
      border-right: 1px solid var(--border-color);
    }
    p + button {
      border-left: 1px solid var(--border-color);
    }
  }
`;

export const ProductTotalAmount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  margin-bottom: 30px;
  h3,
  span {
    font-weight: 700;
  }

  div {
    display: flex;
    align-items: center;
  }

  p:first-child {
    color: var(--border-color);
  }

  p:first-child::after {
    content: '|';
    margin: 0 14px;
  }

  p:nth-child(2),
  span {
    color: var(--main-color);
    span {
      font-size: var(--font-xl);
    }
  }
`;

export const SubmitButtonWrap = styled.div`
  display: flex;
  gap: 14px;
`;
