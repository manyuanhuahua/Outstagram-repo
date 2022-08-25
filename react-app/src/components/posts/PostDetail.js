import { useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useHistory, useParams} from "react-router-dom";
import EditPostModal from "../modals/EditPostModal";
import {getPostDetailThunk, deletePostThunk, likePostThunk  } from "../../store/post"
import GetComments from "../comments/CommentsList";
import CreateCommentForm from "../comments/CreateComment";
import "../../styles/postDetail.css"



const PostDetail = () => {
    const dispatch = useDispatch();
    const {postId} = useParams();
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
    if (postIsLoaded && post && (session.id === post.userId)){
       showButton = true
    }

    const handleDelete = async (e)=>{
        e.preventDefault();
       return dispatch(deletePostThunk(postId)).then(()=>history.push('/session/posts'))
    }

    const handleLikes = async (postId) => {
        return dispatch(likePostThunk(postId))
    }


    if(!post){
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


    return (postIsLoaded && post && <>
            <div className="post-detail-container">
                <div>
                    <div className="post-detail-post-image-top">
                    </div>
                    <img alt="" src={post.imageUrl} className="post-detail-post-image"></img>
                    <div className="post-detail-post-image-bottom">
                    </div>
                </div>
                <div className="post-detail-post-info-container">
                    <div className="post-detail-post-info-first-container">
                        <div><img alt="" src={post.user.profileImage} className="post-detail-user-image"></img></div>
                        <div>{post.user.username}</div>
                        {showButton && (<div>
                            <button onClick={handleDelete}>Delete post</button>

                            <button onClick={()=>setEditModal(true)}>Edit post</button>
                            {editModal && <EditPostModal post={post} setShowModal={setEditModal}/>}

                        </div>)}
                    </div>
                    <div >
                        <div className="post-detail-post-info-second-container">
                            <div><img alt="" src={post.user.profileImage} className="post-detail-user-image"></img></div>
                            <div>
                                <div>
                                    <p>{post.user.username} {post.description}</p>
                                    <p>{timeAfterCreated(post.createdAt)}</p>
                                </div>
                                <div>
                                    <GetComments postId={postId}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div><button onClick={() => handleLikes(postId)} className={(!!post.likeStatus) ? "post-liked": "post-unliked"}>likes post</button></div>
                        <p>{!!post.totalLikes && (post.totalLikes === 1 ?  <p>1 like</p> : <p>{post.totalLikes} likes</p>)}</p>
                        <p>{post.createdAt}</p>
                    </div>
                    <div>
                        <CreateCommentForm postId={postId}/>

                    </div>

                </div>
           </div>


 </>
    )
}


export default PostDetail;
