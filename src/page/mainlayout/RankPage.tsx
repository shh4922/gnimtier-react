import styled from "styled-components";

import RankGroup from "@/components/Rank/RankGroup";
import RankStream from "@/components/Rank/RankStream";

import { useNavigate } from "react-router-dom";



const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const SeeMoreBtn = styled.button`
    width: 70%;
    height: 2.5rem;
    border: none;
    background-color: tomato;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 0.6rem;
    margin: 1rem 0;
`;

export default function RankPage() {
    
    const navigate = useNavigate();

    const handleSeeMore = () => {
        navigate('/seeMoreRank');
    }

    return (
        <Wrapper>
            <RankGroup groupName="56동원지원단" />
            <SeeMoreBtn onClick={handleSeeMore}>더보기 +</SeeMoreBtn>
            <RankStream />
        </Wrapper>
    );
}