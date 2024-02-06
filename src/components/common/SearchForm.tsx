import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import SearchIcon from '../../assets/icon-search.svg';

export interface SearchProps {}

const SearchForm = (props: SearchProps) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

  const isMobile = useMediaQuery({ query: '(max-width:767px)' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search/${inputValue}`);
  };

  return (
    <SearchWrap onSubmit={handleInputSubmit}>
      <input type='text' placeholder={isMobile ? '' : '상품을 검색해보세요!'} onChange={handleInputChange} />
      <button type='button' onClick={handleInputSubmit}>
        <img src={SearchIcon} alt='' />
      </button>
    </SearchWrap>
  );
};

const SearchWrap = styled.form`
  width: 100%;
  max-width: 700px;
  min-width: 200px;
  height: 46px;
  border: 2px solid var(--point-color);
  border-radius: 50px;
  padding: 0 18px 0 22px;
  color: var(--sub-font-color);
  display: flex;

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
