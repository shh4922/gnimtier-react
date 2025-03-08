import {useEffect, useState} from "react";
import useUserStore from "@/store/userStore";
import {Link} from "react-router-dom";

const DummyPage4TestHook = () => {
    const [count, setCount] = useState<number>(0);
    const  userId  = useUserStore((state)=>state.userId)
    useEffect(() => {
        console.log("마운트1 실행")
    }, []);

    useEffect(() => {
        console.log("카운트 이펙트 실행")
    }, [count]);

    return (
        <div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Link to="/dummy">더미1</Link>
                <Link to="/dummy2">더미2</Link>
                <Link to="/dummy3">더미3</Link>
                <Link to="/dummy4">더미4</Link>
                <Link to="/dummy5">더미5</Link>
            </div>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>카운트증가</button>
            <p>{userId}</p>
        </div>
    );
};

export default DummyPage4TestHook;
