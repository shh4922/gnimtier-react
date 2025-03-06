import styles from './css/RankItem.module.css';

interface RankItemProps {
    rank: number;
    name: string;
    tier: string;
    point: number;
    winRate: string;
}

export default function RankItem({ rank, name, tier, point, winRate }: RankItemProps) {

    return (
        <div className={styles.rankItem}>
            <div className={styles.rowOne}>{rank}등</div>     {/* 1 */}
            <div className={styles.rowTwo}>                   {/* 2 */}
                <div>프사</div>
                <div>{name}</div>
            </div>
            <div className={styles.rowThree}>                {/* 3 */}
                <div className={styles.tierAndPoint}>
                    <div>img</div>
                    <div className={styles.tierAndPointText}>
                        <span>{tier}</span>
                        <span>{point}LP</span>
                    </div>
                </div>
                <div className={styles.winRateBox}>{winRate}</div>
            </div>

        </div>
    );
}