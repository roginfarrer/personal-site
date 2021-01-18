import { createGlobalStyle } from "styled-components";

const globalStyle = createGlobalStyle`
  html {
    font-family: ${({ theme }) => theme.fonts.sansSerif};
    font-size: 18px;
  }

  body {
    -webkit-font-smoothing: ${({ theme }) =>
      theme.useAntiAliasing ? "antialiased" : ""};
    font-size: ${({ theme }) => theme.fontSizes[1]};
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
  }

  p {
    margin: 0;
  }

  img {
    max-width: 100%;
  }
`;

export default globalStyle;
