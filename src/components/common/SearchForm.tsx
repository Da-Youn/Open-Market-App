import styled from 'styled-components';
import SearchIcon from '../../assets/icon-search.svg';

export interface SearchProps {}

const SearchForm = (props: SearchProps) => {
  return (
    <SearchWrap>
      <input type='text' placeholder='상품을 검색해보세요!' />
      <button type='submit'>
        <img src={SearchIcon} alt='' />
      </button>
    </SearchWrap>
  );
};

const SearchWrap = styled.form`
  width: 400px;
  height: 46px;
  border: 2px solid var(--main-color);
  border-radius: 50px;
  padding: 0 18px 0 22px;
  color: var(--sub-font-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  button {
    width: 28px;
    height: 28px;
    display: inline-block;
    margin-right: 0;
  }

  input {
    width: 100%;
  }
`;

export default SearchForm;
