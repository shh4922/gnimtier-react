interface VoteDivisionBoxProps {
    divisionName: string;
    grade?: string;
    voteCount?: number;
    onVote?: () => void;
}
export default function VoteDivisionBox({ divisionName, grade, voteCount, onVote }: VoteDivisionBoxProps): import("react/jsx-runtime").JSX.Element;
export {};
