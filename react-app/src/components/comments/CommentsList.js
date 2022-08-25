import { useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import { getCommentsThunk, deleteCommentThunk, likeCommentThunk } from "../../store/comment";
import "../../styles/commentsList.css"



const GetComments = ({postId}) => {
    const dispatch = useDispatch();
    const comments = useSelector(state => state.comment);
    const session = useSelector(state => state.session.user);
    const [commentsIsLoaded, setCommentsIsLoaded] = useState(false);
    const commentsList = Object.values(comments)
    commentsList.reverse()

    useEffect(()=>{
        dispatch(getCommentsThunk(postId)).then(()=>setCommentsIsLoaded(true))
    },[dispatch])

    const handleDelete = async (postId,commentId)=>{

       return dispatch(deleteCommentThunk(postId, commentId))
    }

    const handleLikes = async (postId, commentId) => {
    
        return dispatch(likeCommentThunk(postId, commentId))
    }

    if (! comments) {
        return null
    }

    const timeAfterCreated = (createdAt) => {
        const age = Date.now() - Date.parse(createdAt);
        let res;
        const second = Math.floor( age / 1000 )
        const minute = Math.floor( second / 60 );
        const hour = Math.floor( minute / 60 );
        const day = Math.floor( hour / 24 );
        const week = Math.floor(day / 7)
        if (week > 0) {
            res = `${week}w`
        }
        else if (day > 0 ) {
            res = `${day}d`
        }
        else if (hour > 0 ) {
            res = `${hour}h`
        }
        else if (minute > 0 ) {
            res = `${minute}m`
        }
        else {
            res = `${second}s`
        }

        return res
    }



    return (commentsIsLoaded &&

        <div>
            {commentsList.map((comment)=>
            (
            <div key={comment.id} className="comment-list-comment-container">
                <div>
                <img alt="" src={comment.user.profileImage} className="comment-list-user-image"/>
                </div>
                <div>
                    <div>{comment.user.username}</div>
                    <div>{comment.content}</div>
                    <div>{timeAfterCreated(comment.createdAt)}</div>
                    <div>{!!comment.totalLikes && (comment.totalLikes === 1 ?  <p>1 like</p> : <p>{comment.totalLikes} likes</p>)}</div>
                    <div>
                        {session.id === comment.userId && <button onClick={() => handleDelete(postId, comment.id)}>Delete Comment</button>}
                    </div>

                </div>
            <div>
                <button onClick={() => {handleLikes(postId, comment.id)}} className={!!comment.likeStatus ? "comment-liked":"comment-unliked"}>heart sign</button>
            </div>
        </div>)
            )}
        </div>
    )
}

export default  GetComments
