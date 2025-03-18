// import "./home.module.scss"
import styles from './home.module.scss';
import MainRankCell from "@/components/Rank/MainRankCell";
import {Group, useFetchGroupList, useFetchGroupsUserByGroupId} from "@/api/group/group";
import useUserStore from "@/store/userStore";
import {useEffect, useState} from "react";
import { useNavigate} from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const myInfo = useUserStore()
    const { data: groupData, isLoading:groupListLoading, isSuccess:groupSuccess } = useFetchGroupList(myInfo.userId);
    const [firstGroupId, setFirstGroup] = useState<string|null>(null)

    // const {data:riotInfo, isError:riotInfoError} = useFetchRiotInfo(myInfo.userId);

    const { data: groupUserResponse, isSuccess:groupUserSuccess } = useFetchGroupsUserByGroupId(firstGroupId ?? null, 0);

    /** 로그인 안했을 경우 */
    useEffect(() => {
        if(localStorage.getItem('a') === null && myInfo.userId === null) {
            setFirstGroup("1")
        }
    },[])

    /** 그룹데이터 없을경우 */
    useEffect(() => {
        if(myInfo.userId !== null && groupSuccess && !groupListLoading) {
            if(groupData?.groups.length === 0) {
                console.log(groupData)
                setFirstGroup("1")
            } else {
                setFirstGroup(groupData?.groups[0].id)
            }
        }
    }, [groupData,groupSuccess]);




    const moveToGroupList = (group:Group|null) => {
        if((localStorage.getItem('a') === null || myInfo.userId === null) && window.location.pathname !== "/auth/login") {
            alert("로그인하셈")
            navigate("/auth/login");
            return
        }
        if(groupData?.groups.length === 0) {
            alert("그룹가입하셈")
            navigate('/findGroup?groupId=')
            return
        }
        navigate(`/group/${group?.id}`)
    }

    return (
        <div className={styles.homeContainer}>
            {
                groupUserSuccess && (
                    <>
                        {
                            groupData?.groups.length === 0 || myInfo.userId === null ? (
                                <p className={styles.rank}>병신모임 랭킹</p>
                            ) : (
                                <p className={styles.rank}>{groupData?.groups[0].name} 랭킹</p>
                            )
                        }
                        {
                            groupUserResponse?.data.map((user,index) => {
                                return <MainRankCell index={index} userId={user.user.id} rank={user.summoner.entry.RANKED_TFT?.rank ?? 0} profileImageUrl={user.user.profileImageUrl} userName={user.user.nickname} gameName={user.summoner.gameName} tier={user.summoner.entry.RANKED_TFT?.tier ?? 0} point={user.summoner.entry.RANKED_TFT?.leaguePoints ?? 0} win={user.summoner.entry.RANKED_TFT?.wins ?? 0} lose={user.summoner.entry.RANKED_TFT?.losses ?? 0} key={index}/>
                            })
                        }
                        <button onClick={()=>{moveToGroupList(groupData?.groups[0] ?? null)}}>더보기</button>
                    </>
                )

                // )
            }
        </div>
    );
};
