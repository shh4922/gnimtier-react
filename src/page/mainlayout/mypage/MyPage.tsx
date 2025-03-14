import {Link, useNavigate} from "react-router-dom";
import {useFetchRiotInfo} from "@/api/riot/riot.ts";
import useUserStore from "@/store/userStore.ts";
import styles from "./mypage.module.scss";
import Tier from "@/common/Tier.ts";
import {Group, leaveGroup, postJoinGroup, useFetchGroupList} from "@/api/group/group.ts";
import {useQueryClient} from "@tanstack/react-query";
import {useEffect} from "react";
const MyPage = () => {
    const navigate = useNavigate();
    const userStore = useUserStore();
    const {data: myRiotInfo} = useFetchRiotInfo(userStore.userId)
    const {data: myGroupList, refetch} = useFetchGroupList(userStore.userId)
    const tier = new Tier()

    async function getOut(group:Group) {
        if(confirm(`너 진짜 ${group.name} 나갈꺼임?`)) {
            try {
                const res = await leaveGroup(group.id) as {status:string}
                if(res.status === "ACCEPTED" ) {
                    alert("잘가셈...")
                }
            } catch (e) {
                alert("엥 에러남;")
                console.error(e)
            }
            refetch()
        }
    }
    // useEffect(() => {
    //     if(userStore.userId === null) {
    //         alert("회원을 찾을수 없습니다 나가세요")
    //         navigate("/")
    //     }
    // },[userStore])

    return (
        <div className={styles.mypageContainer}>
            <h2>마이페이지</h2>
            <span className={styles.userName}>{userStore.username}님 하이여ㅋㅋ</span>

            {
                myRiotInfo ? (
                    <section className={styles.riotInfo}>
                        <h3>TFT</h3>
                        <div className={styles.tftInfo}>
                            <img className={styles.riotIcon}
                                src={`https://ddragon.leagueoflegends.com/cdn/15.1.1/img/profileicon/${myRiotInfo?.summoners.profileIconId}.png`}/>

                            <div className={styles.tierInfo}>
                                <img
                                     src={`${tier.getTierImage(myRiotInfo?.summoners.entry.RANKED_TFT.tier)}`}
                                     alt={"티어 이미지"}/>
                                <div>
                                    <span>{tier.getTierName(myRiotInfo?.summoners.entry.RANKED_TFT.tier)}</span>
                                    <span> {tier.getRankToRoma(myRiotInfo?.summoners.entry.RANKED_TFT.rank)}</span>
                                </div>

                            </div>

                            <div className={styles.riotUserInfo}>
                                <span>{myRiotInfo.summoners.gameName} #{myRiotInfo.summoners.tagLine}</span>
                                <div className={styles.rate}>
                                    <span>승리: {myRiotInfo.summoners.entry.RANKED_TFT.wins}</span>
                                    <span>패배: {myRiotInfo.summoners.entry.RANKED_TFT.losses}</span>
                                    <span>{myRiotInfo.summoners.entry.RANKED_TFT.leaguePoints}점</span>
                                </div>
                            </div>
                        </div>

                    </section>
                ) : (
                    <div className={styles.authRiot}>
                        <h3>라이엇 계정 인증하기</h3>
                        <Link to={"/rso"}>인증하러 가봅세</Link>
                    </div>
                )
            }

            {
                myGroupList ? (
                    <div className={styles.groupContainer}>
                        <h3>가입한그룹</h3>
                        <ul className={styles.groupList}>
                            {myGroupList.groups.length > 0 ? (
                                myGroupList.groups.map((group) => (
                                    <li className={styles.group} key={group.id}>
                                        <span>{group.name}</span>
                                        <span>총 {group.userCount}명임</span>
                                        <button onClick={() => getOut(group)}>나가기</button>
                                    </li>
                                ))
                            ) : (
                                <li className={styles.noGroup}>님 그룹이 없음 가입좀하셈..</li>
                            )}
                        </ul>
                    </div>
                ) : null
            }


        </div>
    );
};

export default MyPage;
