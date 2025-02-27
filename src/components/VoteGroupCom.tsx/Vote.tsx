import styled from 'styled-components';

import VoteDivisionBox from '@/components/VoteGroupCom.tsx/VoteDivisionBox';

const VoteContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const DivideComment = styled.div`
    display: flex;
    align-items: start;
    justify-content: center;
    margin: 0.7rem 0;
    
`;

const CommentSpan = styled.span`
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0.5rem 0;
`;

export default function Vote() {
    return (
        <VoteContainer>
            <VoteDivisionBox
                divisionName='수도방위사령부'
                grade='1등'
                voteCount={0}
                onVote= {()=> console.log('수도방위사령부 투표')}
            />
            <VoteDivisionBox
                divisionName='육군동원전력사령부'
                grade='2등'
                voteCount={0}
                onVote= {()=> console.log('육군동원전력사령부 투표')}
            />
            <VoteDivisionBox
                divisionName='제1전투비행단'
                grade='3등'
                voteCount={0}
                onVote= {()=> console.log('제1전투비행단 투표')}
            />
            <DivideComment>
                <CommentSpan>아쉬운데?</CommentSpan>
            </DivideComment>
            <VoteDivisionBox
                divisionName='해병대사령부'
                grade='4등'
                voteCount={0}
                onVote= {()=> console.log('해병대사령부 투표')}
            />
            
            

            
        </VoteContainer>
    );
}