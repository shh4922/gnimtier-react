import React from 'react';
import {Comment} from "@/api/comments/comments.ts";
import styles from "./comment.module.scss";

interface CommentProps {
    comment: Comment;
}

const CommentComponent = ({comment}:CommentProps) => {
    return (
        <li className={styles.comment}>
            <span>{comment.comment}</span>
            <button onClick={() => {
                alert("유료임 \n 79200101444402 국민 500원 입금하면 보여드림")
            }}>누가씀?
            </button>
        </li>
    );
};

export default CommentComponent;
