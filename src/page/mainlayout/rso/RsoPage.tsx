import {useFetchRiotAccount, useFetchRiotInfo, usePostRiotAccount} from "@/api/riot/riot";
import {useEffect, useState} from "react";
import useUserStore from "@/store/userStore";
import {useNavigate} from "react-router-dom";
import styles from "./rsoPage.module.scss"

const RsoPage = () => {
    const [gameName, setGameName] = useState<string>('')
    const [tagLine, setTagLine] = useState<string>('')
    const navigate = useNavigate();

    const  userInfo  = useUserStore()
    const {data:myRiotInfo} = useFetchRiotInfo(userInfo.userId)

    const {mutate} = usePostRiotAccount()
    const {refetch} = useFetchRiotAccount(gameName,tagLine)


    useEffect(() => {
        if (myRiotInfo?.summoners !== null) {
            alert("이미계정있음 ㅅㄱ")
            navigate(-1)
        }
    }, [userInfo]);

    const postRiotAccount = async () => {
        if(gameName === "" || tagLine === "" ){
            alert("빈칸 다 채우셈")
            return
        }

        const result = await refetch()
        if(result.isError && !result.data) {
            alert("그런계정 없는것같음 나가셈")
            return
        }

        if(result.isSuccess) {
            console.log("res",result)

            const riotAccount = result.data.summoner
            const isTrue = confirm(`${riotAccount.gameName} ${riotAccount.tagLine} 이계정 맞음? 한번등록하면 못바꿈 나중에 업뎃해줄거임`)

            if(isTrue) {
                const puuid = result.data?.summoner.puuid
                mutate(
                    {puuid},
                    {
                        onSuccess: () => {
                            alert("등록됨ㅋㅋ")
                            navigate("/")
                        },
                        onError: () => {
                            alert("등록중에 에러생김 ㅅㄱ")
                        }
                    })
            } else {
                return
            }
        }
    }

    return (
        <div className={styles.rsoContainer}>
            <h2>라이엇 계정 인증</h2>
            <input onChange={(e) => setGameName(e.target.value)} value={gameName} placeholder={"라이엇계정 입력하셈"}/>
            <input onChange={(e) => setTagLine(e.target.value)} value={tagLine} placeholder={"태크입력하는데 # 은 뺴셈 #꼭 뺴셈"}/>
            <button onClick={postRiotAccount}>계정등록 하기.</button>
        </div>
    );
};

export default RsoPage;
