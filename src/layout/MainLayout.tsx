
import {Outlet} from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * 메인 레이아웃을 잡아야 css 설정하기가 편할겁니다.
 * Outlet의 경우, router의 하위경로를 불러오기 위해 사용한겁니다.
 * @constructor
 */
const MainLayout = () => {
    return (
        <>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    );
};

export default MainLayout;
