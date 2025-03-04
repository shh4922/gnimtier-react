import {useState} from "react";
import {useFetchRiotAccount, usePostRiotAccount} from "@/api/riot/riot";


const DummyPage5 = () => {
    const [gameName, setGameName] = useState<string>('')
    const [tagLine, setTagLine] = useState<string>('')
    const {mutate} = usePostRiotAccount()
    const {refetch,error} = useFetchRiotAccount(gameName,tagLine)

    const postRiotAccount = async () => {
        const result = await refetch()
        if(result.isError && !result.data) { return }
        const puuid = result.data?.summoner.puuid
        console.log(result.data)
        console.log(puuid)
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

    if(error) {
        return <div>그런애 없음. </div>
    }
    return (
        <div>
            <input onChange={(e) => setGameName(e.target.value)} value={gameName}/>
            <input onChange={(e) =>setTagLine(e.target.value)} value={tagLine}/>
            <button onClick={postRiotAccount}></button>

        </div>
    );
};

export default DummyPage5;
