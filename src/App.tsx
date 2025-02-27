import GlobalStyle from "./GlobalStyle.tsx";
import Router from "./router/Router.tsx";
import {useEffect} from "react";


function App() {

    useEffect(() => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init(import.meta.env.VITE_KAKAO_JS);
            console.log("✅ Kakao SDK Initialized!");
        } else {
            console.error("❌ Kakao SDK not loaded");
        }
    }, []);
  return (
    <>
      <GlobalStyle />
      <Router></Router>
    </>
  )
}

export default App
