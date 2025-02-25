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

    /* 모바일 사이즈일 때 */
    @media screen and (max-width: 480px) {
        #root {
            width: 100%;
            height: 100vh;
            
        }    
    }

    /* 모바일 사이즈 이상일 때 */
    @media screen and (min-width: 481px) {
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
    }
`;

export default GlobalStyle;