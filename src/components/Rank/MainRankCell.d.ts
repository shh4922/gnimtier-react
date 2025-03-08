interface RankItemProps {
    userId: string;
    rank: number;
    profileImageUrl: string;
    gameName: string;
    tier: number;
    point: number;
    win: number;
    lose: number;
}
export default function MainRankCell({ userId, rank, profileImageUrl, gameName, tier, point, win, lose }: RankItemProps): import("react/jsx-runtime").JSX.Element;
export {};
