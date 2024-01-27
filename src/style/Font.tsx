import { css } from 'styled-components';

import SpoqaHanSansNeoRegular from './Fonts/SpoqaHanSansNeo-Regular.ttf';
import SpoqaHanSansNeoMedium from './Fonts/SpoqaHanSansNeo-Medium.ttf';
import SpoqaHanSansNeoBold from './Fonts/SpoqaHanSansNeo-Bold.ttf';

export const Font = css`
  @font-face {
    font-family: 'SpoqaHanSansNeo';
    font-weight: 400;
    src: url(${SpoqaHanSansNeoRegular}) format('truetype');
  }

  @font-face {
    font-family: 'SpoqaHanSansNeo';
    font-weight: 500;
    src: url(${SpoqaHanSansNeoMedium}) format('truetype');
  }

  @font-face {
    font-family: 'SpoqaHanSansNeo';

    font-weight: 700;

    src: url(${SpoqaHanSansNeoBold}) format('truetype');
  }
`;
