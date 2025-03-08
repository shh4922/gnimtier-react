
import {Outlet} from "react-router-dom";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import "./mainlayout.scss"
const MainLayout = () => {
    return (
        <div className="main">
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
};

export default MainLayout;
