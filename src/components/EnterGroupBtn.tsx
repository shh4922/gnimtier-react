import styled from 'styled-components';

const GetIn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 6rem;
    
`;

const GetInBtn = styled.button`
    padding: 1rem;
    width: 17rem;
    border: none;
    border-radius: 0.5rem;
    background-color: gray;
    font-size: 1rem;
    cursor: pointer;
`;

export default function EnterGroupBtn() {
    return (
        <GetIn>
            <GetInBtn>여기 들어갈 거임?</GetInBtn>
        </GetIn>

    );
};