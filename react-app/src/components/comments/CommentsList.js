import { useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import { getCommentsThunk, deleteCommentThunk, likeCommentThunk } from "../../store/comment";


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
        console.log("in handlelikes--------")
        return dispatch(likeCommentThunk(postId, commentId))
    }



    return (commentsIsLoaded &&

        <div>
            {commentsList.map((comment)=>
            (
            <div key={comment.id}>
                <div>
                <img alt="" src={comment.user.profileImage}/>
                </div>
                <div>
                    <div>{comment.user.username}{comment.content}</div>
                    <div>{comment.createAt}</div>
                    <div>{!!comment.totalLikes && (comment.totalLikes === 1 ?  <p>1 like</p> : <p>{comment.totalLikes} likes</p>)}</div>
                    <div>
                        {session.id === comment.userId && <button onClick={() => handleDelete(postId, comment.id)}>Delete Comment</button>}
                    </div>

                </div>
            <div>
                <button onClick={() => {handleLikes(postId, comment.id)}}>heart sign</button>
            </div>
        </div>)
            )}
        </div>
    )
}

export default  GetComments
