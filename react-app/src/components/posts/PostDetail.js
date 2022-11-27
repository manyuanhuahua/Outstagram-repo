import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import EditPostModal from "../modals/EditPostModal";
import { getPostDetailThunk, deletePostThunk, likePostThunk } from "../../store/post"
import GetComments from "../comments/CommentsList";
import CreateCommentForm from "../comments/CreateComment";
import "../../styles/postDetail.css";
import likeIcon from '../../Images/instagram-like-icon.png';
import likedIcon from '../../Images/PngItem_5229528.png';



const PostDetail = () => {
    const dispatch = useDispatch();
    const { postId } = useParams();
    const history = useHistory()
    const post = useSelector(state => state.post[postId]);
    const session = useSelector(state => state.session.user);
    const [postIsLoaded, setPostIsLoaded] = useState(false);
    const [editModal, setEditModal] = useState(false);


    useEffect(() => {
        dispatch(getPostDetailThunk(postId)).then(() => setPostIsLoaded(true));
    }, [dispatch]);
    let showButton = false
    // const [showButton, setShowButton] = useState(false);
    if (postIsLoaded && post && (session.id === post.userId)) {
        showButton = true
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        return dispatch(deletePostThunk(postId)).then(() => history.push('/session/posts'))
    }

    const handleLikes = async (postId) => {
        return dispatch(likePostThunk(postId))
    }


    if (!post) {
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

    const postCreatedDate = (createdAt) => {

        return createdAt.split(', '[1])[2] + ' ' + createdAt.split(', '[1])[1]
    }


    return (postIsLoaded && post && <>
        <div className="post-detail-container">
            <div style={{ background: 'black' }}>
                <div className="post-detail-post-image-top">
                </div>
                <div style={{ width: '500px', height: '500px', objectFit: 'cover' }}>
                    <img alt="" src={post.imageUrl} className="post-detail-post-image" />
                </div>
                <div className="post-detail-post-image-bottom">
                </div>
            </div>
            <div className="post-detail-post-info-container">
                <div className="post-detail-post-info-first-container">
                    <div className="post-detail-post-user-info">
                        <NavLink className="post-header-username" to={`/users/${post.userId}/posts`}>
                            <img alt="" src={post.user.profileImage} className="post-detail-user-image" style={{ marginRight: '4px' }}></img>
                        </NavLink>
                        <NavLink className="post-header-username" to={`/users/${post.userId}/posts`}>
                            <div style={{ paddingLeft: '4px' }} className="post-detail-post-username" >{post.user.username}</div>
                        </NavLink>
                    </div>
                    {showButton && (<div className="post-detail-buttons">
                        <button onClick={handleDelete} className="login-button" style={{ width: '100px' }}>Delete post</button>

                        <button onClick={() => setEditModal(true)} className="login-button" style={{ width: '90px' }}>Edit post</button>
                        {editModal && <EditPostModal post={post} setShowModal={setEditModal} />}

                    </div>)}
                </div>

                <div className="post-detail-post-info-second-container">
                    <NavLink className="post-header-username" to={`/users/${post.userId}/posts`} style={{ margin: '0px' }}>
                        <div><img alt="" src={post.user.profileImage} className="post-detail-user-image" style={{ margin: '0px' }}></img></div>
                    </NavLink>

                    <div style={{ marginLeft: '8px' }}>
                        <p><NavLink className="post-header-username" to={`/users/${post.userId}/posts`}>
                            <span className="post-detail-post-username" style={{ marginRight: '8px' }}>{post.user.username}</span>
                        </NavLink>
                            {post.description}
                        </p>

                        <p>{timeAfterCreated(post.createdAt)}</p>
                    </div>
                </div>


                <div className="post-detail-post-comments">
                    <GetComments postId={postId} />
                </div>
                <div>
                    {/* <div><button onClick={() => handleLikes(postId)} >likes post</button></div> */}
                    <div onClick={() => handleLikes(postId)}>
                        {post.likeStatus === 1 ?
                            <img src={likedIcon} alt="like-button-icon" style={{ height: '24px', width: '24px', cursor: 'pointer' }} />
                            :
                            <img src={likeIcon} alt="like-button-icon" style={{ height: '24px', width: '24px', cursor: 'pointer' }} />
                        }

                    </div>

                    <div>{!!post.totalLikes && (post.totalLikes === 1 ? <p>1 like</p> : <p>{post.totalLikes} likes</p>)}</div>
                    <p>{postCreatedDate(post.createdAt)}</p>
                </div>
                <div>
                    <CreateCommentForm postId={postId} />

                </div>

            </div>
        </div>


    </>
    )
}


export default PostDetail;
