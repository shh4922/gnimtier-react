import styles from './mainRankCell.module.scss';
import Tier from "@/common/Tier";
import {useNavigate} from "react-router-dom";

interface RankItemProps {
    index: number
    userId: string;
    rank: number;
    profileImageUrl: string;
    userName: string;
    gameName: string;
    tier: number;
    point: number;
    win: number;
    lose: number;
    // win: number;

}

export default function MainRankCell({ index, userId, rank, profileImageUrl, userName, gameName, tier, point, win, lose }: RankItemProps) {

    const tier2 = new Tier()
    const navigate = useNavigate();

    function moveToDetail(userId:string) {
        navigate(`/profile/${userId}`);
    }

    return (
        <div className={styles.rankItem} onClick={() => {moveToDetail(userId)}}>

            <p className={styles.rank}>{index+1} 등</p>

            <div className={styles.rowTwo}>                   {/* 2 */}
                <img src={profileImageUrl} alt="profileImageUrl" />
                <span>{userName}</span>
            </div>

            <div className={styles.rowThree}>                {/* 3 */}

                <div className={styles.tierAndPoint}>
                    <img className={styles.tierImage} src={`${tier2.getTierImage(tier)}`} alt={"티어 이미지"}/>
                    <div className={styles.tierAndPointText}>
                        <span>{tier2.getTierName(tier)}</span>
                        <span>{tier2.getRankToRoma(rank)}</span>
                        <span>{point} LP</span>
                        {/*{*/}
                        {/*    tier === 10 ? (*/}
                        {/*        <span>아이언은 쫌..ㅋㅋ</span>*/}
                        {/*    ) : (*/}
                        {/*    <span>뭐보여줄지 추천좀</span>*/}
                        {/*    )*/}
                        {/*}*/}
                    </div>
                </div>

                <div className={styles.winRateBox}>
                    <span>승리: {win}</span>
                    <span>패배: {lose}</span>

                    <span>승률: { win === 0 && lose === 0 ? 0 :(win/(win+lose)*100).toFixed(3)}</span>
                </div>
            </div>
        </div>
    );
}
