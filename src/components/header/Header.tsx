import "./header.scss"
import {useFetchMyProfile} from "@/api/user/user";
import useUserStore from "@/store/userStore";
import {useEffect} from "react";
import {IoMdSearch} from "react-icons/io";
import {useNavigate} from "react-router-dom";
export default function Header () {

    const navigate = useNavigate();
    const {data:user} = useFetchMyProfile()
    const userInfo = useUserStore()

    function goToKakaoLogin(){
        window.Kakao.Auth.authorize({
            redirectUri: "http://localhost:5173/kakaologin",
        })
    }

    function moveToFindGroup() {
        navigate('/findGroup?groupId=')
    }

    useEffect(() => {
        if(user?.user) {
            userInfo.setUserInfo(user.user)
        }
    }, [user])

    return (
        <header className="header">
            <h1 onClick={()=>{navigate('/')}}>ㄱㄴㅌ?</h1>

            <nav className="header-nav">
                {/* 그룹찾기 페이지로 이동 */}
                <IoMdSearch onClick={moveToFindGroup}/>
                {user ? (
                    <>
                        <img src={user.user.profileImageUrl} className={"profile-img"}/>

                    </>
                ) : (
                    <button onClick={goToKakaoLogin}>정보없음. 로그인하러가셈</button>
                    )
                }
            </nav>
        </header>
    );
};


