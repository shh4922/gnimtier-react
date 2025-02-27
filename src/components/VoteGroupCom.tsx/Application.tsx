import styled from 'styled-components';

const ApplyContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 7rem;
    
`;

const Comment = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    margin: 0.7rem 0;
    padding-left: 1rem;
`;

const SpanOne = styled.span`
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0.3rem 0;
`;

const SpanTwo = styled.span`
    font-size: 0.8rem;
`;

const ApplyBtn = styled.button`
    width: 5rem;
    margin-right: 1.3rem;
    padding: 0.7rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid gray;
    background-color: lightgray;
    font-size: 1rem;
    cursor: pointer;
    transition: ease all 0.2s;
`;

export default function Application() {
    return (
        <ApplyContainer>
            <Comment>
                <SpanOne>우리도 만들어줘!</SpanOne>
                <SpanTwo>그님티는 고결하니까 깐깐함</SpanTwo>
                <SpanTwo>주에 3위까지만 만들어드림 ㅅㄱㅋㅋ</SpanTwo>
            </Comment>
            <ApplyBtn>신청</ApplyBtn>
        </ApplyContainer>

    );
}