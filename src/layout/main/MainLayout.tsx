
import {Outlet} from "react-router-dom";
import Header from "@/components/header/Header.tsx";
import Footer from "@/components/footer/Footer.tsx";
import styles from "@/layout/main/mainlayout.module.scss"

const MainLayout = () => {
    return (
        <div className={styles.mainlayout}>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
};

export default MainLayout;
