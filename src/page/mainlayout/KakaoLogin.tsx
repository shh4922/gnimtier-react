import {useEffect} from 'react';
import {fetchTokenWithKakaoCode} from "@/api/auth/auth";
import {removeToken, setTokenInLocal} from "@/utils/token";
import useUserStore from "@/store/userStore";
import {fetchMyInfo} from "@/api/user/user";


const KakaoLogin = () => {
    const userStore = useUserStore()
    async function getTokenWithCode(code:string){
        //  대충 리디렉.
        if(!code){
            return
        }
        const res = await fetchTokenWithKakaoCode(code);
        removeToken()
        setTokenInLocal(res.access_token, res.refresh_token)
        const userInfo = await fetchMyInfo()
        userStore.setUserInfo(userInfo)
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
