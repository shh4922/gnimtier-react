import styled from "styled-components";

const FooterContainer = styled.footer`
    display: flex;
    align-items: center;
    justify-content: center;
    posuition: fixed;
    bottom: 0;
    width: 100%;
    border-top: 1px dotted gray;


`;

const Footer = () => {
    return (
        <FooterContainer>
            <p>footer</p>
        </FooterContainer>
    );
};

export default Footer;
