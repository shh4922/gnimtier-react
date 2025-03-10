import styles from "./GroupRankPage.module.scss"
import {useFetchGroupByParentId, useFetchGroupsUserByGroupId} from "@/api/group/group";
import {useCallback, useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import MainRankCell from "@/components/Rank/MainRankCell";
import {tftUserInfo} from "@/api/user/model.tft";

/**
 * url파람으로 groupId 받아와야함.
 * @constructor
 */
const GroupRankingPage = () => {
    const params = useParams();
    const groupId = params.groupId;

    const {data:groupInfo} = useFetchGroupByParentId(groupId)

    const [page, setPage] = useState<number>(0);
    const [hasNext, setHasNext] = useState<boolean>(false);
    const { data: groupUserResponse, isLoading: isUserLoading } = useFetchGroupsUserByGroupId(groupId, page);

    const [groupUserList, setGroupUserList] = useState<tftUserInfo[]>([]);

    const observerRef = useRef<IntersectionObserver | null>(null);
    const observerTargetRef = useRef<HTMLDivElement | null>(null);

    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        const target = entries[0];
        if (target.isIntersecting && !isUserLoading && hasNext) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [hasNext]);

    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect();
        observerRef.current = new IntersectionObserver(handleObserver, { threshold: 0 });

        if (observerTargetRef.current) {
            observerRef.current.observe(observerTargetRef.current);
        }

        return () => observerRef.current?.disconnect();
    }, [handleObserver]);


    useEffect(() => {
        if (groupUserResponse) {
            setGroupUserList((prevList) => [...prevList, ...groupUserResponse.data]);
            setHasNext(groupUserResponse.hasNext);
            console.log(groupUserResponse.data);
        }
        console.log("gInfo", groupInfo)
    }, [groupUserResponse,groupInfo]);

    return (
        <div className={styles.groupRankContainer}>
            {/*<h1>내가 속한 그룹 중 첫 번째 그룹: {groupData?.groups[0].name}</h1>*/}
            {/*<button onClick={leaveMyGroup}>탈퇴하기</button>*/}
            <ul>
                {groupUserList?.map((user, index) => (
                    <MainRankCell userId={user.user.id} rank={index} profileImageUrl={user.user.profileImageUrl} gameName={user.summoner.gameName} tier={user.summoner.entry.RANKED_TFT.tier} point={user.summoner.entry.RANKED_TFT.leaguePoints} win={user.summoner.entry.RANKED_TFT.wins} lose={user.summoner.entry.RANKED_TFT.losses} key={index}/>
                ))}
                {isUserLoading && <div>그룹 내부 유저들 가져오는 중...</div>}
                <div ref={observerTargetRef} style={{height: "10px"}}></div>
            </ul>
        </div>
    );
};

export default GroupRankingPage;
