import styled from 'styled-components';

export interface ProductTableProps {}

const ProductTable = (props: ProductTableProps) => {
  return (
    <ProductTableLayout>
      <ProductTableBox>
        <thead>
          <tr>
            <th>상품정보</th>
            <th>판매가격 </th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div>
                <img src='' alt='상품 이미지 ' />
                <div>
                  <p>딥러닝 개발자 무릎 담요</p>
                  <p>
                    재고 : <span>370</span>개
                  </p>
                </div>
              </div>
            </td>
            <td>17,500원</td>
            <td>
              <EditBtn>수정</EditBtn>
            </td>
            <td>
              <DeleteBtn>삭제</DeleteBtn>
            </td>
          </tr>
          <tr>
            <td>
              <div>
                <img src='' alt='상품 이미지 ' />
                <div>
                  <p>딥러닝 개발자 무릎 담요</p>
                  <p>
                    재고 : <span>370</span>개
                  </p>
                </div>
              </div>
            </td>
            <td>17,500원</td>
            <td>
              <EditBtn>수정</EditBtn>
            </td>
            <td>
              <DeleteBtn>삭제</DeleteBtn>
            </td>
          </tr>
          <tr>
            <td>
              <div>
                <img src='' alt='상품 이미지 ' />
                <div>
                  <p>딥러닝 개발자 무릎 담요</p>
                  <p>
                    재고 : <span>370</span>개
                  </p>
                </div>
              </div>
            </td>
            <td>17,500원</td>
            <td>
              <EditBtn>수정</EditBtn>
            </td>
            <td>
              <DeleteBtn>삭제</DeleteBtn>
            </td>
          </tr>
          <tr>
            <td>
              <div>
                <img src='' alt='상품 이미지 ' />
                <div>
                  <p>딥러닝 개발자 무릎 담요</p>
                  <p>
                    재고 : <span>370</span>개
                  </p>
                </div>
              </div>
            </td>
            <td>17,500원</td>
            <td>
              <EditBtn>수정</EditBtn>
            </td>
            <td>
              <DeleteBtn>삭제</DeleteBtn>
            </td>
          </tr>
        </tbody>
      </ProductTableBox>
    </ProductTableLayout>
  );
};

const ProductTableLayout = styled.section`
  width: 100%;
  max-width: 1440px;
  height: 884px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  background-color: var(--sub-color);
  border: 1px solid var(--border-color);
  position: relative;
`;

const ProductTableBox = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead,
  tbody {
    background-color: #fff;
  }

  thead {
    width: 100%;
  }

  th {
    padding: 18px 0;
    display: fixed;
  }

  th,
  td {
    margin: 0px 30px;
    padding: 16px 30px;
    vertical-align: middle;
    font-size: var(--font-md);
    border-bottom: 1px solid var(--border-color);
  }

  td:not(td:first-child) {
    text-align: center;
  }

  td div {
    display: flex;
    align-items: center;
    gap: 30px;

    div {
      align-items: stretch;
      flex-direction: column;
      gap: 10px;
    }

    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      object-fit: cover;
      object-position: 0 0;
    }

    p {
      font-size: var(--font-md);
    }

    p:last-child {
      font-size: var(--font-sm);
      color: var(--sub-font-color);
    }
  }

  td:nth-child(2) {
    width: 30%;
  }
  td:nth-child(3),
  td:nth-child(4) {
    width: 0%;
  }
  button {
    width: 80px;
    height: 40px;
    border-radius: 5px;
  }
`;

const EditBtn = styled.button`
  color: #fff;
  background-color: var(--main-color);
`;
const DeleteBtn = styled.button`
  color: var(--sub-font-color);
  background-color: var (--white);
  border: 1.5px solid var(--border-color);
  &:hover {
    color: #000;
    border-color: #000;
  }
`;

export default ProductTable;
