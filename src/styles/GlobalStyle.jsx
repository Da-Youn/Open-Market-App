import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
	${reset}

    @font-face {
    font-family: 'SpoqaHanSansNeo-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

 :root{
	--main-color: #21BF48 ;
	--sub-color:#F2F2F2;
	--border-color:#C4C4C4;
    --font-color: #333333;
    --sub-font-color: #767676;;
    --error-font-color: #EB5757;
    --primary-color: #ffffff;
	--font-xl : 36px;
	--font-lg : 24px;
	--font-md : 18px;
	--font-sm : 16px;


  }

  .a11y-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }

	a{
		text-decoration: none;
		color: inherit;
	}
	*{
		box-sizing: border-box;
	
	}
	html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
	a, dl, dt, dd, ol, ul, li, form, label, table, input,button{
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 16px;
		vertical-align: baseline;
        font-family: 'SpoqaHanSansNeo-Regular';
	}

	ol, ul{
		list-style: none;
	}
	button {
		border: 0;
		background: transparent;
		font-family: inherit;
		cursor: pointer;
	}

	input{
		&:focus {
		outline: none;
	}
	}

  .hidden {
	display: none;
  }
`;

export default GlobalStyle;
