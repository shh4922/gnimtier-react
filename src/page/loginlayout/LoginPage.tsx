import styles from "./styles.module.scss"
const LoginPage = () => {

    function goToKakaoLogin(){
        window.Kakao.Auth.authorize({
            redirectUri: "https://dev.xn--2i0bm6giy8a.kr/kakaologin",
            // redirectUri: "http://localhost:5173/kakaologin",
    })
    }

    return (
        <div className={styles.loginContainer}>
            <h1 className={styles.title}>그래서 님 티어가 ?</h1>
            <button onClick={()=> {goToKakaoLogin()}}><img src={"/kakao_login.png"} alt={'카카오로그인 버튼'}/></button>
        </div>
    );
};

export default LoginPage;
