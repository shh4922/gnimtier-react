import styled from "styled-components";

import RankGroup from "@/components/Rank/RankGroup";

import { useState } from "react";



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
    const [showMore, setShowMore] = useState(false);

    const handleShowMore = () => {
        setShowMore(!showMore);
    }

    return (
        <Wrapper>
            <RankGroup showMore={showMore} groupName="56동원지원단" />
            <SeeMoreBtn onClick={handleShowMore}>
                {showMore ? "간략히 보기" : "더보기 +"}
            </SeeMoreBtn>
            <RankGroup showMore={showMore} groupName="스트리머" />
        </Wrapper>
    );
}