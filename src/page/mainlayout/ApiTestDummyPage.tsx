import {useFetchMyProfile} from "@/api/user/user";
import {useEffect} from "react";
import useUserStore from "@/store/userStore";
import {Link} from "react-router-dom";



const ApiTestDummyPage = () => {
    /** 내정보 패칭. 없으면 로그인*/
    const {data:user, isLoading, error} = useFetchMyProfile()
    const userInfo = useUserStore()

    useEffect(() => {
        if(user?.user) {
            userInfo.setUserInfo(user.user)
        }
    }, [user])


    useEffect(() => {
        console.log("Updated userInfo", userInfo);
    }, [userInfo]); // userInfo가 변경될 때 로그 찍힘


    function goToKakaoLogin(){
        window.Kakao.Auth.authorize({
            redirectUri: "http://localhost:5173/kakaologin",
        })
    }

    return (
        <div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Link to="/dummy">더미1</Link>
                <Link to="/dummy2">더미2</Link>
                <Link to="/dummy3">더미3</Link>
                <Link to="/dummy4">더미4</Link>
                <Link to="/dummy5">더미5</Link>
            </div>
            <h1>apiTestDummyPage</h1>
            <button onClick={goToKakaoLogin}>카카오로그인</button>
            {isLoading &&
                <div>Loading...</div>
            }
            {error &&
                <button onClick={goToKakaoLogin}>에러남. 로그인하러가셈</button>
            }

            {user ? (
                <div>
                    <p>{user.user.nickname}</p>
                    <img src={user.user.profileImageUrl}/>
                </div>
            ) : (
                <button onClick={goToKakaoLogin}>정보없음. 로그인하러가셈</button>
            )
            }

        </div>

    );
};

export default ApiTestDummyPage;
