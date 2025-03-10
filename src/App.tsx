import Router from "./router/Router.tsx";
import { useEffect } from "react";
import "./App.css";

function App() {
    useEffect(() => {
        if (window.Kakao) {
            if (!window.Kakao.isInitialized()) {
                window.Kakao.init(import.meta.env.VITE_KAKAO_JS);
                console.log("✅ Kakao SDK Initialized!");
            } else {
                console.log("⚡ Kakao SDK already initialized");
            }
        } else {
            console.error("❌ Kakao SDK not loaded (window.Kakao is undefined)");
        }
    }, []);

    return (
        <div className="App">
            <Router />
        </div>
    );
}

export default App;
