import {PendingGroup, useFetchPendingGroups, voteGroup} from "@/api/group/group";
import {useCallback, useEffect, useRef, useState} from "react";
import styles from "./voteGroup.module.scss";
const VoteGroupPage = () => {
    const [page, setPage] = useState<number>(0);
    const [pendingGroupList, setpendingGroupList] = useState<PendingGroup[]>([]);
    const {data:pendingGroupResponse, refetch, isLoading} = useFetchPendingGroups(page)
    const [hasNext, setHasNext] = useState<boolean>(false);

    const observerRef = useRef<IntersectionObserver | null>(null);
    const observerTargetRef = useRef<HTMLDivElement | null>(null);

    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        const target = entries[0];
        if (target.isIntersecting && !isLoading && hasNext) {
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
        if (pendingGroupResponse) {
            setpendingGroupList((prevList) => [...prevList, ...pendingGroupResponse.groups.data]);
            setHasNext(pendingGroupResponse.groups.hasNext);

        }

    }, [pendingGroupResponse]);

    async function vote(group:PendingGroup) {
        const isTrue = confirm(`너 그룹투표하면 1시간 다른곳 투표못함 \n 진짜 ${group.name}얘 투표할거임?`)
        if (isTrue) {
            try {
                const res = await voteGroup(group.id) as {status:string}
                if(res.status === "ACCEPTED") {
                    alert("투표완료")
                    // refetch()
                }
            } catch (e) {
                console.error(e)
                alert("1시간 안됬음 너")
            }


        }
    }

    return (
        <div className={styles.voteGroupContainer}>
            <section className={styles.postGroup}>
                <div>
                    <h3>그룹 요청하기</h3>
                    <p>좀 깐깐해서 1주 뒤에나 만들어질거같음</p>
                </div>
                <button onClick={()=>{alert("쫌만 ㄱ다려줘 금방만들게..!")}}>그룹신청하기</button>
            </section>

            <section className={styles.pendingGroupList}>
                {
                    pendingGroupList.map((item, index) => (
                        <div key={index} className={styles.group}>
                            <p>{index + 1}등</p>
                            <p>{item.name}</p>
                            <div className={styles.vote}>
                                <p>총 투표수 : {item.voteCount}</p>
                                <button onClick={() => {vote(item)}}>투표하기</button>
                            </div>
                        </div>
                    ))
                }
                <div ref={observerTargetRef} style={{height: "10px"}}></div>
            </section>
        </div>
    );
};

export default VoteGroupPage;
