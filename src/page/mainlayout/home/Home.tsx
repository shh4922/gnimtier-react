// import "./home.module.scss"
import styles from './home.module.scss';
import MainRankCell from "@/components/Rank/MainRankCell";
import {useFetchGroupList, useFetchGroupsUserByGroupId} from "@/api/group/group";
import useUserStore from "@/store/userStore";
import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useFetchRiotInfo} from "@/api/riot/riot";


export default function Home() {
    const navigate = useNavigate();
    const myInfo = useUserStore()
    const { data: groupData, isSuccess:groupSuccess, isError:myGroupError, error } = useFetchGroupList(myInfo.userId);
    const {data:riotInfo, isError:riotInfoError} = useFetchRiotInfo(myInfo.userId);
    const firstGroupId = groupData?.groups[0]

    const { data: groupUserResponse} = useFetchGroupsUserByGroupId(firstGroupId?.id, 0);

    useEffect(() => {
        if(localStorage.getItem('a') === null) {
            alert("로그인하셈")
            navigate("/auth/login");
        }
    },[myInfo])


    useEffect(() => {
        if(myInfo.userId !== null && riotInfoError || riotInfo?.summoners === null ) {
            alert("라이엇계정먼저 등록해줘야함..")
            navigate("/auth/login");
        }
    },[myInfo])

    useEffect(() => {
        if(myInfo.userId !== null && riotInfo?.summoners !== null && groupSuccess && firstGroupId === undefined || firstGroupId === null) {
            alert("그룹도 가입해줘야함..ㅋ")
            navigate('/findGroup?groupId=')
        }
    },[groupData])



    if(error) {
        return <div>인증된 라이엇계정이 없음</div>
    }


    return (
        <div className={styles.homeContainer}>
            {
                myGroupError ? (
                    <div>가입된 그룹없는데 그룹부터 가입하셈</div>
                ) : (
                    <>
                        <p className={styles.rank}>{firstGroupId?.name} 랭킹</p>
                        {
                            groupUserResponse?.data.map((user,index) => {
                                return <MainRankCell userId={user.user.id} rank={index} profileImageUrl={user.user.profileImageUrl} gameName={user.summoner.gameName} tier={user.summoner.entry.RANKED_TFT.tier} point={user.summoner.entry.RANKED_TFT.leaguePoints} win={user.summoner.entry.RANKED_TFT.wins} lose={user.summoner.entry.RANKED_TFT.losses} key={index}/>
                            })
                        }
                        <Link to={`/group/${groupData?.groups[0].id}`}>더보기 +</Link>
                    </>
                )
            }
        </div>
    );
};

