import styled from 'styled-components';
import EnterGroupBtn from '../EnterGroupBtn';
import { MilitaryType } from '../../types/MilitaryType';
import { militaryData } from '../../data/MilitaryData';

interface MilitaryCommandCenterProps {
    type: MilitaryType;
    onBack?: () => void;
}

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
`;

export const MilTitle = styled.span`
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0 2rem;
`;

export const DivisionList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0;
    width: 100%;

`;

export const Division = styled.div`
    width: 10rem;
    text-align: center;
    margin: 0.5rem;
    padding: 0.5rem;
    border: 1px solid #A47764;
    border-radius: 0.5rem;
    cursor: pointer;
    &:hover {
        background-color: #A47764;
        color: white;
    }
`;

export const BackContainer = styled.div`
    align-self: flex-start;
    margin: 0 1rem;
`;

export const BackBtn = styled.button`
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    border: none;
    border-radius: 0.5rem;
    background-color: lightgray;
    color: black;
    cursor: pointer;
`;


export default function MilitaryCommandCenter({ type, onBack }: MilitaryCommandCenterProps) {
    const data = militaryData[type];

    return (
        <Wrapper>
            <BackContainer>
                {onBack && <BackBtn onClick={onBack}>이전</BackBtn>}
            </BackContainer>
            
            <MilTitle>{data.name}</MilTitle>
            <DivisionList>
                {data.divisions.map((division, index) => (
                    <Division key={index}>{division}</Division>
                ))}
            </DivisionList>
            <EnterGroupBtn />
        </Wrapper>
    )
}
