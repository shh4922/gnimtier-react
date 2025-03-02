import {useEffect, useState} from "react";

const DummyPage4TestHook = () => {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        console.log("마운트1 실행")
    }, []);

    useEffect(() => {
        console.log("카운트 이펙트 실행")
    }, [count]);

    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>카운트증가</button>
        </div>
    );
};

export default DummyPage4TestHook;
