import {useFetchUserProfile} from "@/api/user/user";
import {useFetchRiotInfo} from "@/api/riot/riot";
import {Link, useParams} from "react-router-dom";
import styles from "./UserDetail.module.scss"
// import styles from "@/components/Rank/css/mainRankCell.module.scss";
import Tier from "@/common/Tier";
import {useFetchGroupList} from "@/api/group/group";
import {Comment, useFetchCommentsByUserId} from "@/api/comments/comments.ts";
import React, {useCallback, useEffect, useRef, useState} from "react";
import CommentComponent from "@/components/comment/Comment.tsx";
import CreatePost from "@/page/mainlayout/postComment/CreatePost.tsx";

const UserDetailPage = () => {
    const params = useParams();
    const tier = new Tier()
    const {data:userInfo } = useFetchUserProfile(params.userId);
    const {data:riotInfo} = useFetchRiotInfo(params.userId)
    const {data: groupList } = useFetchGroupList(params.userId);
    const {data: commentResponse, isLoading:isCommentsLoading, isSuccess:commentsSuccess } = useFetchCommentsByUserId(params.userId);
    const [commentsList, setCommentsList] = useState<Comment[]>([]);

    const [isShowPost, setIsShowPost] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const [hasNext, setHasNext] = useState<boolean>(false);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const observerTargetRef = useRef<HTMLDivElement | null>(null);

    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        const target = entries[0];
        if (target.isIntersecting && !isCommentsLoading && hasNext) {
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
        if (commentResponse) {
            setCommentsList((prevList) => {
                const newData = commentResponse.data;
                const mergedList = [...prevList, ...newData];

                return mergedList;
            });
            setHasNext(commentResponse.hasNext);
        }
    }, [commentResponse]);


    function updateUserInfo(){
        alert("아직 준비중임..ㅈㅅ요..")
    }
    function handleCancel(value: boolean) {
        setIsShowPost(value);
    };

    if(!userInfo || !riotInfo || !groupList) {
        return null
    }

    return (
        <div className={styles.userDetailContainer}>

            <section className={styles.userInfo}>
                <div className={styles.rowTwo}>
                    <img src={userInfo.user.profileImageUrl} alt="profileImageUrl"/>
                    <span>{riotInfo.summoners.gameName} #{riotInfo.summoners.tagLine}</span>
                </div>

                <div className={styles.rowThree}>
                    <div className={styles.tierAndPoint}>
                        <img className={styles.tierImage} src={`${tier.getTierImage(riotInfo.summoners.entry.RANKED_TFT?.tier ?? 0)}`} alt={"티어 이미지"}/>
                        <div className={styles.tierAndPointText}>
                            <span>{tier.getTierName(riotInfo.summoners.entry.RANKED_TFT?.tier ?? 0)}</span>
                            <span>{tier.getRankToRoma(riotInfo.summoners.entry.RANKED_TFT?.rank ?? 0)}</span>
                            <span>{riotInfo.summoners.entry.RANKED_TFT?.leaguePoints ?? 0} LP</span>
                        </div>
                    </div>

                    <div className={styles.winRateBox}>
                        <span>Lv: {riotInfo.summoners.summonerLevel}</span>
                        <span>승리: {riotInfo.summoners.entry.RANKED_TFT?.wins ?? 0}</span>
                        <span>패배: {riotInfo.summoners.entry.RANKED_TFT?.losses ?? 0}</span>
                        <span>승률: {riotInfo.summoners.entry.RANKED_TFT === null ? 0 : (riotInfo.summoners.entry.RANKED_TFT.wins  / (riotInfo.summoners.entry.RANKED_TFT.wins + riotInfo.summoners.entry.RANKED_TFT.losses) * 100).toFixed(3)}</span>
                    </div>
                    <button onClick={updateUserInfo}>전적갱신버튼</button>
                </div>
            </section>

            {
                isShowPost ? (
                    <CreatePost userId={userInfo.user.id} cancle={handleCancel}/>
                ) : (
                    <>
                        <section className={styles.groupList}>
                            <span className={styles.include}>{userInfo.user.nickname}씨 가입한 그룹</span>
                            {
                                groupList.groups.map((group) => {
                                    return (
                                        <div className={styles.group} key={group.id}>
                                            <span>{group.name}</span>
                                            <div>
                                                <span>총유저 {group.userCount}중.. {group.rank}등임</span>
                                                {
                                                    group.rank === group.userCount && (
                                                        <span className={styles.last}> 지리네 꼴등임ㅋㅋ</span>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </section>

                        <section className={styles.comments}>
                            <div className={styles.commentsHead}>
                                <span className={styles.include}>방명록</span>
                                {/*<Link to={"/post"}>작성하기</Link>*/}
                                <button onClick={()=> {setIsShowPost(true)}}>작성하기</button>
                            </div>

                            <ul className={styles.commentsList}>
                                {
                                    commentsList.length === 0 ? (
                                        <li>방명록이 없음;</li>
                                    ) : (
                                        commentsList.map((commentItem, index) => (
                                            <CommentComponent comment={commentItem} key={index}/>
                                        ))
                                    )
                                }
                                <div ref={observerTargetRef} style={{height: "60px", visibility: "hidden"}}></div>
                            </ul>
                        </section>
                    </>
                )
            }

        </div>
    )
};

export default UserDetailPage;
