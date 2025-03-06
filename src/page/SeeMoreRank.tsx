import styled from "styled-components";

import RankGroup from "@/components/Rank/RankGroup";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
`;

const ActionBtnWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 60%;
    margin-top: 1rem;
`;

const ActionBtn = styled.button`
    font-size: 0.8rem;
    padding: 1rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    :hover {
        cursor: pointer;
    }
    
`;

export default function SeeMoreRank() {
    return (
        <Wrapper>
            <ActionBtnWrapper>
                <ActionBtn>초대하기</ActionBtn>
                <ActionBtn>그룹 나가기</ActionBtn>
            </ActionBtnWrapper>
            <RankGroup groupName="56동원지원단" showAll={true} />
        </Wrapper>
    );
}