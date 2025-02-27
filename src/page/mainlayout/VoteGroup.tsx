import styled from 'styled-components';

import Application from '@/components/VoteGroupCom.tsx/Application';
import Vote from '@/components/VoteGroupCom.tsx/Vote';

const MobileContainer = styled.div`
    max-width: 480px;
    min-width: 320px;
    margin: 0 auto;
    background-color: #f5f5f5;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 85vh;
    min-height: -webkit-fill-available;   /* for iOS */


`;



export default function VoteGroup() {
    return (
        <MobileContainer>
            <Wrapper>
                <Application />
                <Vote />
            </Wrapper>
        </MobileContainer>
    );
};