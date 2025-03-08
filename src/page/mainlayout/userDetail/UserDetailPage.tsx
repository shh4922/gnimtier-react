import {useFetchUserProfile} from "@/api/user/user";
import {useFetchRiotInfo} from "@/api/riot/riot";
import {useParams} from "react-router-dom";
import styles from "./UserDetail.module.scss"
// import styles from "@/components/Rank/css/RankItem.module.scss";
import Tier from "@/common/Tier";
import {useFetchGroupList} from "@/api/group/group";

const UserDetailPage = () => {
    const params = useParams();
    const tier = new Tier()
    const {data:userInfo, isSuccess:userSuccess} = useFetchUserProfile(params.userId);
    const {data:riotInfo, isSuccess:riotSuccess} = useFetchRiotInfo(params.userId)
    const {data: groupList, isSuccess:groupSuccess} = useFetchGroupList(params.userId);

    function updateUserInfo(){
        alert("아직 준비중임..ㅈㅅ요..")
    }

    if(!userSuccess || !riotSuccess || !groupSuccess) {
        return <div>정보를 가져오는데 실패했슴다;</div>
    }
    return (
        <div className={styles.userDetailContainer}>

            <section className={styles.userInfo}>
                <div className={styles.rowTwo}>
                    <img src={userInfo.user.profileImageUrl} alt="profileImageUrl"/>
                    <span>{riotInfo.summoners.gameName} #{riotInfo.summoners.tagLine}</span>
                </div>

                <div className={styles.rowThree}>
                    <div className={styles.tierAndPoint}>
                        <img className={styles.tierImage} src={`${tier.getTierImage(riotInfo.summoners.entry.RANKED_TFT.tier)}`} alt={"티어 이미지"}/>
                        <div className={styles.tierAndPointText}>
                            <span>{tier.getTierName(riotInfo.summoners.entry.RANKED_TFT.tier)}</span>
                            <span>{riotInfo.summoners.entry.RANKED_TFT.leaguePoints} LP</span>
                        </div>
                    </div>

                    <div className={styles.winRateBox}>
                        <span>Lv: {riotInfo.summoners.summonerLevel}</span>
                        <span>승리: {riotInfo.summoners.entry.RANKED_TFT.wins}</span>
                        <span>패배: {riotInfo.summoners.entry.RANKED_TFT.losses}</span>
                        <span>승률: {(riotInfo.summoners.entry.RANKED_TFT.wins / (riotInfo.summoners.entry.RANKED_TFT.wins + riotInfo.summoners.entry.RANKED_TFT.losses) * 100).toFixed(3)}</span>
                    </div>
                    <button onClick={updateUserInfo}>전적갱신버튼</button>
                </div>
            </section>

            <section className={styles.groupList}>
                <span className={styles.include}>{userInfo.user.nickname}씨 가입한 그룹</span>
                {
                    groupList.groups.map((group) => {
                        return (
                            <div className={styles.group} key={group.id}>
                                <span>{group.name}</span>
                                <div>
                                    <span>총유저 {group.userCount}중.. {group.rank}등임</span>
                                    {
                                        group.rank === group.userCount && (
                                            <span className={styles.last}> 지리네 꼴등임ㅋㅋ</span>
                                        )
                                    }
                                </div>

                            </div>
                        )
                    })
                }
            </section>
        </div>
    )
};

export default UserDetailPage;
