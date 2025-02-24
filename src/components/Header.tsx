import styled from "styled-components";

const HeaderContainer = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 3rem;
    margin-top: 0.5rem;
    border-bottom: 1px dotted gray;
`;

const Title = styled.span`
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
        <HeaderContainer>
            <Title>ㄱㄴㅌ?</Title>
            <HeaderNav>
                <Icon>나침반</Icon>
                <Icon>돋보기</Icon>
                <Icon>더보기</Icon>
            </HeaderNav>
        </HeaderContainer>
    );
};


