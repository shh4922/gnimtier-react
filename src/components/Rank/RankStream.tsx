import styles from './css/RankGroup.module.css';

import MainRankCell from './MainRankCell';




export default function RankStream() {

    const rankData = [
        { rank: 1, name: "페이커", tier: "Master", point: 1800, winRate: "승률?" },
        { rank: 2, name: "우지", tier: "Master", point: 1806, winRate: "승률?" },
        { rank: 3, name: "쇼메이커", tier: "Master", point: 1806, winRate: "승률?" },
    ];

    const displayData = rankData.slice(0, 4);

    return (
        <div className={styles.container}>
            <div className={styles.rankTitle}>스트리머 랭킹</div>
            <div className={styles.rankContainer}>
                {displayData.map((item) => (
                    <MainRankCell
                        key={item.rank}
                        rank={item.rank}
                        name={item.name}
                        tier={item.tier}
                        point={item.point}
                        winRate={item.winRate}
                    />
                ))}
            </div>

        </div>
    );
}
