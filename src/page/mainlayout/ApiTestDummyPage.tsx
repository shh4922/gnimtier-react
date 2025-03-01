import { useProfile} from "@/api/user/user";



const ApiTestDummyPage = () => {
    /** 내정보 패칭. 없으면 로그인*/
    const {data:user, isLoading, error} = useProfile()


    function goToKakaoLogin(){
        window.Kakao.Auth.authorize({
            redirectUri: "http://localhost:5173/kakaologin",
        })
    }

    return (
        <div>
            <h1>apiTestDummyPage</h1>
            <button onClick={goToKakaoLogin}>카카오로그인</button>

            { isLoading &&
                <div>Loading...</div>
            }
            { error &&
                <button onClick={goToKakaoLogin}>에러남. 로그인하러가셈</button>
            }

            { user ? (
                <div>
                    <p>{user.nickname}</p>
                    <img src={user.profileImageUrl}/>
                </div>
            ) : (
                <button onClick={goToKakaoLogin}>정보없음. 로그인하러가셈</button>
            )
            }

        </div>

    );
};

export default ApiTestDummyPage;
