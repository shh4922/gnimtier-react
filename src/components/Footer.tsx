import styled from "styled-components";

const FooterContainer = styled.footer`
    display: flex;
    align-items: center;
    justify-content: center;
    posuition: fixed;
    bottom: 0;
    width: 100%;


`;

const Footer = () => {
    return (
        <FooterContainer>
            <p>푸터임</p>
        </FooterContainer>
    );
};

export default Footer;
