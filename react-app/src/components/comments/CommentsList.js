import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getCommentsThunk, deleteCommentThunk, likeCommentThunk } from "../../store/comment";
import "../../styles/commentsList.css";
import likeIcon from '../../Images/instagram-like-icon.png';
import likedIcon from '../../Images/PngItem_5229528.png';




const GetComments = ({ postId }) => {
    const dispatch = useDispatch();
    const comments = useSelector(state => state.comment);
    const session = useSelector(state => state.session.user);
    const [commentsIsLoaded, setCommentsIsLoaded] = useState(false);
    const commentsList = Object.values(comments)
    commentsList.reverse()

    useEffect(() => {
        dispatch(getCommentsThunk(postId)).then(() => setCommentsIsLoaded(true))
    }, [dispatch, postId])

    const handleDelete = async (postId, commentId) => {

        return dispatch(deleteCommentThunk(postId, commentId))
    }

    const handleLikes = async (postId, commentId) => {

        return dispatch(likeCommentThunk(postId, commentId))
    }

    if (!comments) {
        return null
    }

    const timeAfterCreated = (createdAt) => {
        const age = Date.now() - Date.parse(createdAt);
        let res;
        const second = Math.floor(age / 1000)
        const minute = Math.floor(second / 60);
        const hour = Math.floor(minute / 60);
        const day = Math.floor(hour / 24);
        const week = Math.floor(day / 7)
        if (week > 0) {
            res = createdAt.split(', '[1])[2] + ' ' + createdAt.split(', '[1])[1]
        }
        else if (day > 0) {
            res = createdAt.split(', '[1])[2] + ' ' + createdAt.split(', '[1])[1]
        }
        else if (hour > 0) {
            res = `${hour}h`
        }
        else if (minute > 0) {
            res = `${minute}m`
        }
        else {
            res = `${second}s`
        }

        return res
    }



    return (commentsIsLoaded &&

        <div className="comment-details-container">
            {commentsList.map((comment) =>
            (
                <div key={comment.id} className="comment-list-comment-container">
                    <div className="comment-list-user-content">
                        <div>
                            <NavLink className="post-header-username" to={`/users/${comment.userId}/posts`}>
                                <img alt="" src={comment.user.profileImage} className="comment-list-user-image" />
                            </NavLink>
                        </div>
                        <div className="comment-list-username-like">
                            <div className="comment-list-username-content">
                                <NavLink className="post-header-username" to={`/users/${comment.userId}/posts`}>
                                    <div className="comment-list-username">{comment.user.username}</div>
                                </NavLink>
                                <div>{comment.content}</div>
                            </div>
                            <div className="comment-list-create-like">
                                <p className="comment-list-create">{timeAfterCreated(comment.createdAt)}</p>
                                {!!comment.totalLikes && (comment.totalLikes === 1 ? <p className="like-button" >1 like</p> : <p className="like-button">{comment.totalLikes} likes</p>)}
                                {session.id === comment.userId && <button className="login-button" style={{ width: '40px', padding: '0px', margin: '15px 0', marginBottom: '4px', fontSize: '12px', height: '25px' }} onClick={() => handleDelete(postId, comment.id)}>Delete</button>}
                            </div>
                        </div>
                    </div>
                    <div className="comment-list-delete-like" style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>

                        <div onClick={() => handleLikes(postId, comment.id)}>
                            {comment.likeStatus === 1 ?
                                <img src={likedIcon} alt="like-button-icon" style={{ height: '16px', width: '16px', cursor: 'pointer' }} />
                                :
                                <img src={likeIcon} alt="like-button-icon" style={{ height: '16px', width: '16px', cursor: 'pointer' }} />
                            }
                        </div>

                    </div>



                </div>)
            )}
        </div>
    )
}

export default GetComments
