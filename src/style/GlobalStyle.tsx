import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { Font } from './Font';

const GlobalStyle = createGlobalStyle`
	${reset}
	${Font}
 :root{

	--font-color: #333333; 
	--sub-font-color: #767676;
	--point-color:#D19F9F;
	--primary-color:#424242;
	--border-color:#C4C4C4;
	--sub-border-color:#E0E0E0;
	--background-color: #ffffff;
	--sub-background-color:#F2F2F2;
    --error-color: #EB5757;
	--valid-color:#1A8931;
    --white: #ffffff; 
	--hover-color : #EFEBEA;
	--font-xl : 36px;
	--font-lg : 24px;
	--font-md : 18px;
	--font-sm : 16px;
	--font-xs : 14px
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
        font-family: 'SpoqaHanSansNeo';
	}

	ol, ul{
		list-style: none;
	}
	button {
		border: 0;  
		color: #000;
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
