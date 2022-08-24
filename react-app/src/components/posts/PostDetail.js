import { useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import { getPostDetailThunk  } from "../../store/post"
import EditPostModal from "../modals/EditPostModal";

const PostDetail = () => {
    const dispatch = useDispatch();
    const {postId} = useParams();
    const post = useSelector(state => state.post[postId]);
    const session = useSelector(state => state.session.user);
    const [postIsLoaded, setPostIsLoaded] = useState(false);
    const [editModal, setEditModal] = useState(false);

    useEffect(() => {
        dispatch(getPostDetailThunk(postId)).then(() => setPostIsLoaded(true));
    }, [dispatch]);
    let showButton = false
    // const [showButton, setShowButton] = useState(false);
    if (postIsLoaded && (session.id === post.userId)){
       showButton = true
    }

    return (postIsLoaded && <>
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
                            <button>Delete</button>

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
                                <div>comments</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div><button>likes</button></div>
                        <div><button>comment</button></div>
                        <p>{post.totalLikes}likes</p>
                        <p>{post.createdAt}</p>
                    </div>
                    <div>
                        <form>
                        <input type="textarea"></input>
                        <button>Post</button>

                        </form>
                    </div>

                </div>
           </div>
           <div>Comments</div>

 </>
    )
}


export default PostDetail;
