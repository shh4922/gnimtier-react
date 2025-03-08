import Router from "./router/Router.tsx";
import {useEffect} from "react";
import "./App.css"
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
    <div className="App">
      <Router></Router>
    </div>
  )
}

export default App
