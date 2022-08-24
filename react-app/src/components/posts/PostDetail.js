import { useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useHistory, useParams} from "react-router-dom";
import { getPostDetailThunk  } from "../../store/post"
import EditPostModal from "../modals/EditPostModal";
import { deletePostThunk  } from "../../store/post"
import GetComments from "../comments/CommentsList";
import CreateCommentForm from "../comments/CreateComment";

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
    if(!post){
        return null
    }
    return (postIsLoaded && post && <>
            <div>
                <div>
                    <div>
                    <img alt="" src={post.imageUrl}></img>
                    </div>
                </div>
                <div>
                    <div>
                        <div><img alt="" src={post.user.profileImage}></img></div>
                        <div>{post.user.username}</div>
                        {showButton && (<div>
                            <button onClick={handleDelete}>Delete</button>

                            <button onClick={()=>setEditModal(true)}>Edit</button>
                            {editModal && <EditPostModal post={post} setShowModal={setEditModal}/>}



                        </div>)}
                    </div>
                    <div>
                        <div>
                            <div><img alt="" src={post.user.profileImage}></img></div>
                            <div>
                                <div>
                                    <p>{post.user.username} {post.description}</p>
                                    <p>time after created</p>
                                </div>
                                <div>
                                    <GetComments postId={postId}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div><button>likes</button></div>
                        <p>{post.totalLikes}likes</p>
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
