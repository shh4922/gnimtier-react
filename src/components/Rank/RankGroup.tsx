import styles from './css/RankGroup.module.css';

interface RankGroupProps {
    showMore: boolean;
    groupName: string;
}


export default function RankGroup({ showMore, groupName }: RankGroupProps) {

    const rankData = [
        { rank: 1, name: "똥지단페이커", tier: "Dia", point: 180, winRate: "승률?" },
        { rank: 2, name: "2페이커", tier: "Silver", point: 1806, winRate: "승률?" },
        { rank: 3, name: "1페이커", tier: "Gold", point: 1806, winRate: "승률?" },
        { rank: 4, name: "5페이커", tier: "Dia", point: 186, winRate: "승률?" },
        { rank: 5, name: "7페이커", tier: "Gold", point: 180, winRate: "승률?" },
        { rank: 6, name: "23페이커", tier: "Dia", point: 106, winRate: "승률?" },
        { rank: 7, name: "9페이커", tier: "Master", point: 806, winRate: "승률?" },
        { rank: 8, name: "16페이커", tier: "Dia", point: 6, winRate: "승률?" },
        
    ];

    // showMore이 ture면 전체 데이터, false면 5개만 보여줌.
    const displayData = showMore ? rankData : rankData.slice(0, 4);

    return (
        <div className={styles.container}>
            <div className={styles.rankTitle}>{groupName} 랭킹</div>
            <div className={styles.rankContainer}>
                {displayData.map((item) => (
                    <div key={item.rank} className={styles.rankItem}>
                        <div className={styles.rowOne}>{item.rank}등</div>     {/* 1 */}
                        <div className={styles.rowTwo}>                   {/* 2 */}
                            <div>프사</div>
                            <div>{item.name}</div>
                        </div>
                        <div className={styles.rowThree}>                {/* 3 */}
                            <div className={styles.tierAndPoint}>
                                <div>img</div>
                                <div className={styles.tierAndPointText}>
                                    <span>{item.tier}</span>
                                    <span>{item.point}LP</span>
                                </div>
                            </div>
                            <div className={styles.winRateBox}>{item.winRate}</div>
                        </div>

                    </div>
                ))}
            </div>
            
        </div>
    );
}