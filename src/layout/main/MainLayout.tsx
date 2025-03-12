
import {Outlet} from "react-router-dom";
import Header from "@/components/header/Header.tsx";
import Footer from "@/components/Footer.tsx";
import "./mainlayout.scss"
const MainLayout = () => {
    return (
        <div className="main">
            <Header/>
            <main>
                <Outlet/>
            </main>
            {/*<Footer/>*/}
        </div>
    );
};

export default MainLayout;
