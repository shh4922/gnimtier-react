import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html, body, #root {
        height: 100%;
        margin: 0;
        padding: 0;
    }

    body {
        -webkit-text-size-adjust: 100%;
    }
`;

export default GlobalStyle;