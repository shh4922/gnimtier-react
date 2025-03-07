import {useEffect} from "react";


const ApiTestDummyPage = () => {

    function goToKakaoLogin(){
        // console.log("goToKakaoLogin");
        // // ${import.meta.env.VITE_KAKAO_REST}
        // const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=2e49bf8725d265a9e4bf22ec290568f5&redirect_uri=http://localhost:5173/oauth/kakao&response_type=code`;
        // window.location.href = kakaoURL
        window.Kakao.Auth.authorize({
            redirectUri: "http://localhost:5173/kakaologin",
            // redirectUri: "https://dev.xn--2i0bm6giy8a.kr/auth/kakao",
        })
    }

    // async function init(){
    //     // const res = await fetchTftUserByGroup()
    //     // console.log(res)
    //     // const res2 = await fetchMyInfo()
    //     // console.log(res2)
    //
    //     const res3 = await fetchMyRiotAccount()
    //     console.log(res3)
    //
    //
    // }

    // function account(){
    //     const res3 = checkRiotAccount(puuid)
    //     console.log(res3)
    // }
    //
    //
    // async function postRiotAccount(){
    //     const my = await fetchMyRiotAccount()
    //     console.log(my)
    //
    //     // 내정보 조회
    //     const riotInfo = await fetchTftSummonerInfo()
    //
    //     // 내 puuid 뽑음
    //     const puuid = riotInfo.summoner.puuid
    //
    //     // 가입 가능한지 체크
    //     const isChecked = await checkRiotAccount(puuid)
    //
    //     // 가입가능하다면
    //     console.log(isChecked)
    // }

    useEffect(() => {
        window.Kakao.init(import.meta.env.VITE_KAKAO_JS);
    }, []);


    return (
        <div>
            <h1>apiTestDummyPage</h1>
            <button onClick={goToKakaoLogin}>카카오로그인</button>
            {/*<button onClick={account}>뭐임?</button>*/}
        </div>
    );
};

export default ApiTestDummyPage;
