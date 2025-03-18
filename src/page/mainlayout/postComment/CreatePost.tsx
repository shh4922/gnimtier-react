import React, {ChangeEvent, useState} from 'react';
import styles from "@/page/mainlayout/postComment/createpost.module.scss"
import {postComment} from "@/api/comments/comments.ts";
import {postJoinGroup} from "@/api/group/group.ts";

interface createPostProps {
    userId: string;
    cancle: (value:boolean) => void;

}

const CreatePost = ({userId, cancle}:createPostProps, ) => {
    const [comment, setComment] = useState<string>('');
    const [targetUser, setTargetUser] = useState<string>(''); // 댓글 대상 사용자

    const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
    };


    const handleSubmit = async () => {
        try {
            const res = await postComment(userId, comment) as {status:string};
            if(res.status === "ACCEPTED" ) {
                alert("더럽히기 성공!")
            }
        } catch (e) {
            alert("버그남; ㅈㅅ;")
            console.error(e)
        }
        onClickCancle()
    };

    const onClickCancle = () => {
        console.log("누름");
        cancle(false)
    }

    return (
        <div className={styles.commentContainer}>
            <div className={styles.commentHeader}>
                <h2>무자식한테 댓글 마구마구 더럽히기</h2>
                <button className={styles.cancle} onClick={onClickCancle}>취소</button>
            </div>

            <textarea
                className={styles.commentArea}
                id="comment"
                value={comment}
                onChange={handleCommentChange}
                rows={4} // 적절한 높이 설정
                cols={50} // 적절한 너비 설정
                placeholder="마음껏 더럽혀주세요 "
            />
            <button className={styles.submit} onClick={handleSubmit}>댓글 작성</button>
        </div>
    );
};


export default CreatePost;
