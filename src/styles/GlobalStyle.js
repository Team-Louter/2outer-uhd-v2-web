import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* esamanru OTF 웹 폰트 추가 */
  @font-face {
    font-family: 'esamanru OTF';
    src: url('/fonts/esamanru-OTF.woff2') format('woff2'),
         url('/fonts/esamanru-OTF.woff') format('woff'),
         url('/fonts/esamanru-OTF.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
    color: #333;
    background-color: #f8f8f8;
    line-height: 1.5;
    font-weight: 400;
  }

  button, input, select, textarea {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;