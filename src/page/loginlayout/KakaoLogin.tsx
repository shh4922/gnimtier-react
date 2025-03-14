import {useEffect} from 'react';
import {removeToken, setTokenInLocal} from "@/utils/token";
import useUserStore from "@/store/userStore";
import {fetchMyInfo} from "@/api/user/user";
import {fetchTokenWithKakaoCode} from "@/api/auth/auth";
import { useNavigate} from "react-router-dom";

/**
 * 응답형식 DefaultResponse로 바꾸고 나면 다시 바꿔야함.
 * @constructor
 */
const KakaoLogin = () => {
    const navigate = useNavigate();
    const userStore = useUserStore()
    // const [kakaoCode, setKakaoCode] = useState<string>("");

    async function getTokenWithCode(code:string){
        // alert(`함수런함 ${code}`)
        //  대충 리디렉.
        if(!code){ return }
        // alert(`함수런함2 ${code}`)
        try {
            const res = await fetchTokenWithKakaoCode(code);
            alert("환영해유~~")

            removeToken()
            setTokenInLocal(res.tokens.access_token, res.tokens.refresh_token)


        } catch (e) {
            alert(`1   ${e}`)
        }

        try {
            const userInfo = await fetchMyInfo()


            userStore.setUserInfo(userInfo.user)
            navigate('/')
        }catch(err){
            alert(`2    ${err}`)
        }

    }

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code") as string;

        // alert(`카카오코드임 ${code}`)
        if(code === null || code=== undefined) {
            alert("카카오코드가 없어용 에러임; ㅈㅅ;;")
        }
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
