import styled from 'styled-components';

interface VoteDivisionBoxProps {
    divisionName: string;
    grade?: string;
    voteCount?: number;
    onVote?: () => void;
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    border: 1px solid gray;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 1rem 0.5rem;
`;

const Grade = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
`;

const DivisionName = styled.div`
    font-size: 1.1rem;
`;

const VoteBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

`;

const VoteCount = styled.div`
    font-weight: bold;
`;

const VoteBtn = styled.button`
    padding: 0.3rem 0.5rem;
    margin-top: 0.1rem;
`;

export default function VoteDivisionBox({
    divisionName,
    grade = "1등",
    voteCount = 0,
    onVote
}: VoteDivisionBoxProps) {
    return (
        <Container>
            <Grade>{grade}</Grade>
            <DivisionName>{divisionName}</DivisionName>
            <VoteBox>
                <VoteCount>{voteCount}</VoteCount>
                <VoteBtn onClick={onVote}>투표</VoteBtn>
            </VoteBox>
        </Container>
    );
}