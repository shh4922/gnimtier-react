// import "./home.module.scss"
import styles from './home.module.scss';
import MainRankCell from "@/components/Rank/MainRankCell";
import {Group, useFetchGroupList, useFetchGroupsUserByGroupId} from "@/api/group/group";
import useUserStore from "@/store/userStore";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const myInfo = useUserStore()
    const { data: groupData, isLoading:groupListLoading, isSuccess:groupSuccess, isError:myGroupError, error } = useFetchGroupList(myInfo.userId);
    const [firstGroupId, setFirstGroup] = useState<string|null>(null)

    // const {data:riotInfo, isError:riotInfoError} = useFetchRiotInfo(myInfo.userId);

    const { data: groupUserResponse, isSuccess:groupUserSuccess, isError:useGrouperror,error:error2} = useFetchGroupsUserByGroupId(firstGroupId ?? null, 0);

    /** 로그인 안했을 경우 */
    useEffect(() => {
        if(localStorage.getItem('a') === null && myInfo.userId === null) {
            setFirstGroup("1")
        }
    },[])

    /** 그룹데이터 없을경우 */
    useEffect(() => {

        // if(groupData === undefined) {
        //     return;
        // }
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
                                return <MainRankCell userId={user.user.id} rank={index} profileImageUrl={user.user.profileImageUrl} userName={user.user.nickname} gameName={user.summoner.gameName} tier={user.summoner.entry.RANKED_TFT.tier} point={user.summoner.entry.RANKED_TFT.leaguePoints} win={user.summoner.entry.RANKED_TFT.wins} lose={user.summoner.entry.RANKED_TFT.losses} key={index}/>
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
