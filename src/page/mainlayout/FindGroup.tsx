import styled from 'styled-components';
import { useState } from 'react';

import EnterGroupBtn from '@/components/EnterGroupBtn';

import MilitaryCommandCenter from '@/components/Military/MilitaryCommandCenter';

const MobileContainer = styled.div`
    max-width: 480px;
    min-width: 320px;
    margin: 0 auto;
    background-color: #f5f5f5;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Find = styled.div`
    display: flex;
    flex-direction: column;
    height: 70vh;
    min-height: -webkit-fill-available;   /* for iOS */
`;

const FindWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FindTitle = styled.span`
    font-size: 1.1rem;
    font-weight: bold;
    margin: 1rem;
`;

const ChoiceContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 3rem 0;

`;

const FirstChoiceBtn = styled.button`
    margin: 1rem;
    padding: 1rem;
    width: 13rem;
    font-size: 1.5rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #A47764;
    color: black;
    cursor: pointer;

`;



type ViewType = 'main' | 'choice' | 'army' | 'navy' | 'airForce' | 'marine';

export default function FindGroup() {
    const [currentView, setCurrentView] = useState<ViewType>('main');

    const rootGroup: {view:ViewType; name:string}[] = [
        {view:'main', name:'메인'},
        {view:'choice', name:'군대'},
    ]
    const armyGroupList : {view:ViewType; name:string}[] = [
        {view:'army', name:'육군'},
        {view:'navy', name:'해군'},
        {view:'airForce', name:'공군'},
        {view:'marine', name:'marine'},
    ]

    const moveToChildrenView = (view:ViewType) => {
        setCurrentView(view)
    }

    // main 화면 컴포넌트
    // ddd
    const MainView = () => (
        <FindWrapper>
            <ChoiceContainer>
                {
                    rootGroup.map((rootView) => (
                        <FirstChoiceBtn onClick={ ()=>{moveToChildrenView(rootView.view)}} key={rootView.view}>{rootView.name}</FirstChoiceBtn>
                    ))
                }
            </ChoiceContainer>
            <EnterGroupBtn />
        </FindWrapper>
    );

    // 군대 choice 화면 컴포넌트
    const MilitaryChoiceView = () => (
        <FindWrapper>
            <ChoiceContainer>
                {
                    armyGroupList.map((rootView) => (
                        <FirstChoiceBtn onClick={ ()=>{moveToChildrenView(rootView.view)}} key={rootView.view}>{rootView.name}</FirstChoiceBtn>
                    ))
                }
            </ChoiceContainer>
            <EnterGroupBtn />
        </FindWrapper>
    );

    // 렌더링 로직
    const renderContent = () => {
        switch (currentView) {
            case 'main':
                return <MainView />;
            case 'choice':
                return <MilitaryChoiceView />;
            case 'army':
                return <MilitaryCommandCenter type='army' onBack={()=>setCurrentView('choice')} />;
            case 'navy':
                return <MilitaryCommandCenter type='navy' onBack={()=>setCurrentView('choice')}/>;
            case 'airForce':
                return <MilitaryCommandCenter type='airForce' onBack={()=>setCurrentView('choice')} />;
            case 'marine':
                return <MilitaryCommandCenter type='marine' onBack={()=>setCurrentView('choice')} />;
            default:
                return <MainView />;
        }
    };


    return (
        <MobileContainer>
            <Find>
                <FindTitle>그룹 찾기</FindTitle>
                {renderContent()}
            </Find>
        </MobileContainer>


    );
};
