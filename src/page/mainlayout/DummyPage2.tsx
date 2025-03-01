import {useGroupList, useGroupsByGroupId} from "@/api/group/group";
import {Tier} from "@/common/Tier";


const DummyPage2 = () => {
    const { data: groupData, isLoading: isGroupLoading } = useGroupList();
    const firstGroupId = groupData?.groups?.[0]?.id;
    const { data: groupUserList, isLoading: isUserLoading } = useGroupsByGroupId(firstGroupId);

    if(isGroupLoading) {
        return <div> 내가속한 그룹가져오는중..</div>
    }

    if (!firstGroupId) {
        return <div>속한 그룹이 없습니다. 그룹 가입 페이지로 이동하세요.</div>;
    }

    // useEffect(() => {
    //     if (!isGroupLoading && !firstGroupId) {
    //         navigate("dummy3")
    //     }
    // }, [isGroupLoading, firstGroupId]);



    return (
        <div>
            <h1>내가속한 그룹중 제일처음거는 {groupData?.groups[0].name}</h1>
            {
                isUserLoading ? (
                    <div>그룹내부 유저들 가져오는중</div>
                ) : (
                    <ul>
                        {
                            groupUserList?.data.map((user,index) => (
                                <li key={user.summoner.id}>
                                    <div>
                                        <p>{user.user.nickname}</p>
                                        <img
                                            src={`${user.user.profileImageUrl}`}
                                            alt="프로필 이미지"/>
                                        <p>{index+1}등입</p>
                                        <img
                                            src={`https://ddragon.leagueoflegends.com/cdn/15.1.1/img/profileicon/${user.summoner.profileIconId}.png`}
                                            alt="프로필아이콘"/>
                                        <p>{user.summoner.gameName} {user.summoner.tagLine}</p>
                                        <p>{Tier[user.summoner.entry.RANKED_TFT.tier]}</p>
                                        <p>{user.summoner.entry.RANKED_TFT.rank}</p>
                                    </div>
                                </li>)
                            )
                        }
                    </ul>
                )
            }
        </div>
    );
};

export default DummyPage2;
