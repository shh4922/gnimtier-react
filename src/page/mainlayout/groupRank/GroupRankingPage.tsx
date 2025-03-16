import styles from "./GroupRankPage.module.scss"
import {useFetchGroupByParentId, useFetchGroupsUserByGroupId} from "@/api/group/group";
import {useCallback, useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import MainRankCell from "@/components/Rank/MainRankCell";
import {tftUserInfo} from "@/api/user/model.tft";
import {motion} from "framer-motion";
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
            // setGroupUserList((prevList) => [...prevList, ...groupUserResponse.data]);
            setGroupUserList((prevList) => {
                const newData = groupUserResponse.data;

                // 기존 데이터와 새 데이터를 합친 후 userId 기준으로 중복 제거
                const mergedList = [...prevList, ...newData];
                const uniqueList = Array.from(new Map(mergedList.map(user => [user.user.id, user])).values());

                return uniqueList;
            });
            setHasNext(groupUserResponse.hasNext);
        }
    }, [groupUserResponse,groupInfo]);

    return (
        <div className={styles.groupRankContainer}>
            <ul >
                {groupUserList?.map((user, index) => (
                    <motion.div
                        key={index}
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.3}}
                    >
                        <MainRankCell
                            index={index}
                            userId={user.user.id}
                            rank={user.summoner.entry.RANKED_TFT?.rank ?? 0}
                            profileImageUrl={user.user.profileImageUrl}
                            userName={user.user.nickname}
                            gameName={user.summoner.gameName}
                            tier={user.summoner.entry.RANKED_TFT?.tier ?? 0}
                            point={user.summoner.entry.RANKED_TFT?.leaguePoints ?? 0}
                            win={user.summoner.entry.RANKED_TFT?.wins ?? 0}
                            lose={user.summoner.entry.RANKED_TFT?.losses ?? 0}
                        />
                    </motion.div>
                ))}
                <div ref={observerTargetRef} style={{height: "60px", visibility: "hidden"}}></div>
            </ul>
        </div>
        // <div className={styles.groupRankContainer}>

    );
};

export default GroupRankingPage;
