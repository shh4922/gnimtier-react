import styles from './css/RankGroup.module.css';

import MainRankCell from './MainRankCell';

interface RankGroupProps {
    groupName: string;
    showAll?: boolean; // 전체 데이터 표시 여부를 결정하는 props
}


export default function RankGroup({ groupName, showAll = false }: RankGroupProps) {

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

    const displayData = showAll ? rankData : rankData.slice(0, 4);

    return (
        <div className={styles.container}>
            <div className={styles.rankTitle}>{groupName} 랭킹</div>
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
