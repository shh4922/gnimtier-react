import styled from "styled-components";

import { FaRegCompass } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";

const MobileContainer = styled.div`
    max-width: 480px;
    min-width: 320px;
    margin: 0 auto;
    background-color: #f5f5f5;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const HeaderContainer = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 4.3rem;
    padding: 0.5rem 0;
    border-bottom: 1px dotted gray;
`;

const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0 1rem;
`;

const HeaderNav = styled.div`
    margin: 0 0.4rem;
    
`;

const Icon = styled.span`
    margin: 0 3px;
`;


export default function Header () {
    return (
        <MobileContainer>
            <HeaderContainer>
                <Title>ㄱㄴㅌ?</Title>
                <HeaderNav>
                    <Icon><FaRegCompass /></Icon>
                    <Icon><IoMdSearch /></Icon>
                    <Icon><RxHamburgerMenu /></Icon>
                </HeaderNav>
            </HeaderContainer>
        </MobileContainer>

    );
};


