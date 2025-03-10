import { Route, Routes} from "react-router-dom";
import MainLayout from "@/layout/main/MainLayout.tsx";

import Home from "@/page/mainlayout/home/Home";
import FindGroup from "@/page/mainlayout/findGroup/FindGroup";



import KakaoLogin from "@/page/loginlayout/KakaoLogin";

import LoginLayout from "@/layout/login/LoginLayout";
import LoginPage from "@/page/loginlayout/LoginPage";
import GroupRankingPage from "@/page/mainlayout/groupRank/GroupRankingPage";
import UserDetailPage from "@/page/mainlayout/userDetail/UserDetailPage";
import RsoPage from "@/page/mainlayout/rso/RsoPage";
import VoteGroupPage from "@/page/mainlayout/voteGroup/VoteGroupPage";

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
                <Route path={'/kakaoLogin'} element={<KakaoLogin/>}></Route>
            </Route>

            <Route path={'/auth'} element={<LoginLayout/>}>
                <Route path={'login'} element={<LoginPage />}></Route>
            </Route>
        </Routes>
    );
};

export default Router;
