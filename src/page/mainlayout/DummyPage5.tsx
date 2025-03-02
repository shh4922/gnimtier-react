import {useFetchMyRiotInfo} from "@/api/user/user";

const DummyPage5 = () => {
    const {data:myRiotInfo} = useFetchMyRiotInfo()
    return (
        <div>
            <h2>{myRiotInfo?.summoner.gameName}</h2>
            <h2>{myRiotInfo?.summoner.entry.RANKED_TFT.rank}</h2>
            <h1>ads</h1>
        </div>
    );
};

export default DummyPage5;
