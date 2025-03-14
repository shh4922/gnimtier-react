
import {Outlet} from "react-router-dom";
import styles from "./loginlayout.module.scss"
const LoginLayout = () => {
    console.log("loginLayout");
    return (
        <div className={styles.main}>
            <header></header>
            <main>
                <Outlet/>
            </main>
            <footer></footer>
        </div>

    );
};

export default LoginLayout;
