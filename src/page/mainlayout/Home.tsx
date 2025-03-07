import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MobileContainer = styled.div`
    max-width: 480px;
    min-width: 320px;
    margin: 0 auto;
    background-color: #f5f5f5;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled.div`
    height: 85vh;
    min-height: -webkit-fill-available;   /* for iOS */
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    justify-content: center;
    padding: 2rem 0;
    
`;

const Content = styled.div`
    flex: 1;     /* 남은 공간 모두 차지 */
    overflow-y: auto;   /* 내용이 넘칠 경우 스크롤 */
    display: flex;
    flex-direction: column;
    align-items: center;
    
`;

const ViewPage = styled.button`
    margin: 1rem 0;
    padding: 1rem;
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
        <MobileContainer>
            <Wrapper>
                <Content>
                    <ViewPage onClick={() => navigate('/find_group')}>
                        그룹 찾기 페이지
                    </ViewPage>
                    <ViewPage onClick={() => navigate('/vote_group')}>
                        그룹 만들어주세요 & 투표 페이지
                    </ViewPage>
                </Content>


            </Wrapper>
        </MobileContainer>

    );
};

