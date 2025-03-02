import { useFetchGroupList, useFetchGroupsUserByGroupId } from "@/api/group/group";

import { useEffect, useRef, useState, useCallback } from "react";
import { tftUserInfo } from "@/api/user/model.tft";
import Tier from "@/common/Tier";

/**
 * 최적화 필요. 불필요한 렌더링이 한번 일어나는것 같음
 * @constructor
 */

const DummyPage2 = () => {
    const tier = new Tier()
    const { data: groupData, isLoading: isGroupLoading, isSuccess } = useFetchGroupList();
    const firstGroupId = groupData?.groups?.[0]?.id;

    const [page, setPage] = useState<number>(0);
    const [hasNext, setHasNext] = useState<boolean>(false);

    const { data: groupUserResponse, isLoading: isUserLoading } = useFetchGroupsUserByGroupId(firstGroupId, page);
    const [groupUserList, setGroupUserList] = useState<tftUserInfo[]>([]);

    const observerRef = useRef<IntersectionObserver | null>(null);
    const observerTargetRef = useRef<HTMLDivElement | null>(null);


    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        console.log("현재 hasNext1",hasNext);
        const target = entries[0];
        if (target.isIntersecting && !isUserLoading && hasNext) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [hasNext]);


    useEffect(() => {
        console.log("현재 hasNext2",hasNext);
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(handleObserver, { threshold: 0 });

        if (observerTargetRef.current) {
            observerRef.current.observe(observerTargetRef.current);
        }

        return () => observerRef.current?.disconnect();
    }, [handleObserver]);


    useEffect(() => {
        console.log("현재 hasNext3",hasNext);
        if (groupUserResponse) {
            setGroupUserList((prevList) => [...prevList, ...groupUserResponse.data]);

            setHasNext(groupUserResponse.hasNext);
        }
    }, [groupUserResponse]);

    if (isGroupLoading) {
        console.log("내가 속한 그룹 리스트 조회 중...");
    }
    if (isSuccess) {
        console.log("내가 속한 그룹 리스트 조회 끝:", firstGroupId);
    }

    if (!firstGroupId) {
        console.log("내가 속한 그룹 없음");
        return <div>속한 그룹이 없습니다. 그룹 가입 페이지로 이동하세요.</div>;
    }

    return (
        <div>
            <h1>내가 속한 그룹 중 첫 번째 그룹: {groupData?.groups[0].name}</h1>
            <ul>
                {groupUserList.map((user, index) => (
                    <li key={user.summoner.id}>
                        <div>
                            <p>{user.user.nickname}</p>
                            <img src={`${user.user.profileImageUrl}`} alt="프로필 이미지"/>
                            <p>{index + 1}등</p>
                            <img
                                src={`https://ddragon.leagueoflegends.com/cdn/15.1.1/img/profileicon/${user.summoner.profileIconId}.png`}
                                alt="프로필 아이콘"
                            />
                            <p>
                                {user.summoner.gameName} {user.summoner.tagLine}
                            </p>
                            <p>{tier.getTierName(user.summoner.entry.RANKED_TFT.tier)}</p>
                            <img src={`${tier.getTierImage(user.summoner.entry.RANKED_TFT.tier)}`}/>
                            <p>{user.summoner.entry.RANKED_TFT.rank}</p>
                        </div>
                    </li>
                ))}
                {isUserLoading && <div>그룹 내부 유저들 가져오는 중...</div>}
                <div ref={observerTargetRef} style={{ height: "10px" }}></div>
            </ul>
        </div>
    );
};

export default DummyPage2;
