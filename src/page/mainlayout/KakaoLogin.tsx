import {useEffect} from 'react';
import {removeToken, setTokenInLocal} from "@/utils/token";
import useUserStore from "@/store/userStore";
import axios from "axios";
import {fetchMyInfo} from "@/api/user/user";

/**
 * 응답형식 DefaultResponse로 바꾸고 나면 다시 바꿔야함.
 * @constructor
 */
const KakaoLogin = () => {
    const userStore = useUserStore()
    async function getTokenWithCode(code:string){
        //  대충 리디렉.
        if(!code){
            return
        }
        const params= { code: code }
        const res = await axios.get(`${import.meta.env.VITE_BASEURL}${import.meta.env.VITE_API_VERSION}/auth/oauth/kakao`, {
            params
        })

        // res.data.access_token = res.data.access_token
        // const res = await fetchTokenWithKakaoCode(code);
        removeToken()
        setTokenInLocal(res.data.access_token, res.data.refresh_token)
        // setTokenInLocal(res.access_token, res.refresh_token)
        const userInfo = await fetchMyInfo()
        userStore.setUserInfo(userInfo.user)
    }

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code") as string;
        getTokenWithCode(code)
    }, []);
    return (
        <div>
            {/*<p>{user.nickname}</p>*/}
            {/*<img src={user.profileImageUrl ?? '@/assets/react.svg'} />*/}
            <h1>kakaoLogin창임</h1>
        </div>
    );
};

export default KakaoLogin;
