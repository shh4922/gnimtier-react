import {useEffect} from 'react';
import {removeToken, setTokenInLocal} from "@/utils/token";
import useUserStore from "@/store/userStore";
import {fetchMyInfo} from "@/api/user/user";
import {fetchTokenWithKakaoCode} from "@/api/auth/auth";

/**
 * 응답형식 DefaultResponse로 바꾸고 나면 다시 바꿔야함.
 * @constructor
 */
const KakaoLogin = () => {
    const userStore = useUserStore()
    async function getTokenWithCode(code:string){
        //  대충 리디렉.
        if(!code){ return }

        const res = await fetchTokenWithKakaoCode(code);
        removeToken()
        setTokenInLocal(res.tokens.access_token, res.tokens.refresh_token)

        const userInfo = await fetchMyInfo()
        userStore.setUserInfo(userInfo.user)
    }

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code") as string;
        getTokenWithCode(code)
    }, []);
    return (
        <div>
            <h1>kakaoLogin 창임</h1>
            {/*<p>{user.nickname}</p>*/}
            {/*<img src={user.profileImageUrl ?? '@/assets/react.svg'} />*/}
        </div>
    );
};

export default KakaoLogin;
