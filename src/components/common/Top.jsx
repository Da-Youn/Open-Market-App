import React from 'react';
import styled from 'styled-components';

export default function Top() {
	return (
		<TopWrap>
			<a href="#top">↑</a>
		</TopWrap>
	);
}

const TopWrap = styled.article`
	width: 60px;
	height: 60px;
	background-color: var(--main-color);
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	position: fixed;
	bottom: 50px;
	right: 50px;
	a {
		color: #fff;
		font-weight: 700;
		font-size: var(--font-lg);
	}
`;
