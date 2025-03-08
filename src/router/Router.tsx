import { Route, Routes} from "react-router-dom";
import MainLayout from "@/layout/MainLayout";

import Home from "@/page/mainlayout/home/Home";
import FindGroup from "@/page/mainlayout/findGroup/FindGroup";
import VoteGroup from "@/page/mainlayout/VoteGroup";
import RankPage from "@/page/mainlayout/RankPage";
import SeeMoreRank from "@/page/SeeMoreRank";
import PersonalPage from "@/page/mainlayout/PersonalPage";
import MyPage from "@/page/mainlayout/MyPage";

import ApiTestDummyPage from "@/page/dummyPage/ApiTestDummyPage";
import KakaoLogin from "@/page/dummyPage/KakaoLogin";
import DummyPage2 from "@/page/dummyPage/DummyPage2";
import DummyPage3 from "@/page/dummyPage/DummyPage3";
import DummyPage4TestHook from "@/page/dummyPage/DummyPage4TestHook";
import DummyPage5 from "@/page/dummyPage/DummyPage5";
import LoginLayout from "@/layout/login/LoginLayout";
import LoginPage from "@/page/loginlayout/LoginPage";
import GroupRankingPage from "@/page/mainlayout/groupRank/GroupRankingPage";
import UserDetailPage from "@/page/mainlayout/userDetail/UserDetailPage";
import RsoPage from "@/page/mainlayout/rso/RsoPage";
import VoteGroupPage from "@/page/mainlayout/voteGroup/VoteGroupPage";



/**
 * / 로 접근시 MainLayout 을 타게되고 ''같이 경로가 없다면 Home 을 보여주게됩니다.
 * 이후 /login, /register, /rank ... 을 추가로 보여줘야하는데 Header와 Footer가 같다면
 * MainLayout의 하위에 해당컴포넌트(정확히는 viewPage)를 추가하면됩니다
 *
 * 만약 Header, Footer 등을 변경하는 새로운페이지를 만들게된다면 새로운 레이아웃을 만든후,
 * 하위 컴포넌트를 추가하면됩니다.
 * @constructor
 */

const Router = () => {
    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route path={''} element={<Home/>}></Route>
                <Route path={'group/:groupId'} element={<GroupRankingPage/>}></Route>

                <Route path={'findGroup'} element={<FindGroup />}></Route>
                <Route path={'rso'} element={<RsoPage />}></Route>
                <Route path={'voteGroup'} element={<VoteGroupPage />}></Route>

                <Route path={'profile/:userId'} element={<UserDetailPage />}></Route>
                <Route path={'vote_group'} element={<VoteGroup />}></Route>


                <Route path={'/dummy'} element={<ApiTestDummyPage/>}></Route>
                <Route path={'/kakaoLogin'} element={<KakaoLogin/>}></Route>
                <Route path={'/rank'} element={<RankPage />}></Route>
                <Route path={'/seeMoreRank'} element={<SeeMoreRank />}></Route>
                <Route path={'/personalPage'} element={<PersonalPage />}></Route>
                <Route path={'/myPage'} element={<MyPage />}></Route>
            </Route>

            <Route path={'/auth'} element={<LoginLayout/>}>
                <Route path={'login'} element={<LoginPage />}></Route>
            </Route>

            <Route path={'/dummy'} element={<ApiTestDummyPage/>}></Route>
            <Route path={'/dummy2'} element={<DummyPage2/>}></Route>
            <Route path={'/dummy3'} element={<DummyPage3/>}></Route>
            <Route path={'/dummy4'} element={<DummyPage4TestHook/>}></Route>
            <Route path={'/dummy5'} element={<DummyPage5/>}></Route>
            <Route path={'/kakaologin'} element={<KakaoLogin/>}></Route>


        </Routes>
    );
};

export default Router;
