import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    justify-content: center;
    margin: 2rem 0;
    
`;

const ViewPage = styled.button`
    margin: 1rem 0;
    padding: 0.8rem;
    width: 15rem;
    font-size: 1rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #A47764;
    color: white;
`;


export default function Home() {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <ViewPage onClick={() => navigate('/find_group')}>
                그룹 찾기 페이지
            </ViewPage>
            <ViewPage onClick={() => navigate('/vote_group')}>
                그룹 만들어주세요 & 투표 페이지
            </ViewPage>
            
        </Wrapper>
    );
};

