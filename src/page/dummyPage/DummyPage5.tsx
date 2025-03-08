import {useEffect, useState} from "react";
import {useFetchRiotAccount, useFetchRiotInfo, usePostRiotAccount} from "@/api/riot/riot";
import {Link, useNavigate} from "react-router-dom";
import useUserStore from "@/store/userStore";


const DummyPage5 = () => {



    const navigate = useNavigate();
    const  userId  = useUserStore((state)=>state.userId)


    const {data:myRiotInfo} = useFetchRiotInfo(userId)
    useEffect(() => {
        if (myRiotInfo?.summoner !== null) {
            alert("이미계정있음 ㅅㄱ")
            navigate(-1)
        }
    }, [myRiotInfo]);

    const [gameName, setGameName] = useState<string>('')
    const [tagLine, setTagLine] = useState<string>('')
    const {mutate} = usePostRiotAccount()
    const {refetch,error} = useFetchRiotAccount(gameName,tagLine)

    const postRiotAccount = async () => {
        const result = await refetch()
        if(result.isError && !result.data) { return }
        const puuid = result.data?.summoners.puuid

        mutate(
            {puuid},
            {
                onSuccess: () => {
                    alert("등록됨ㅋㅋ")
                },
                onError: () => {
                    alert("등록중에 에러생김 ㅅㄱ")
                }
            })
    }
    const outGroup = ()=> {
        console.log("나가기")
    }




    if(error) {
        return <div>그런애 없음. </div>
    }

    return (
        <div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Link to="/dummy">더미1</Link>
                <Link to="/dummy2">더미2</Link>
                <Link to="/dummy3">더미3</Link>
                <Link to="/dummy4">더미4</Link>
                <Link to="/dummy5">더미5</Link>
            </div>
            <input onChange={(e) => setGameName(e.target.value)} value={gameName}/>
            <input onChange={(e) =>setTagLine(e.target.value)} value={tagLine}/>
            <button onClick={postRiotAccount}></button>
            {
                myRiotInfo?.summoner !== null &&
                    <button onClick={outGroup}>탈퇴하기</button>

            }
        </div>
    );
};

export default DummyPage5;
