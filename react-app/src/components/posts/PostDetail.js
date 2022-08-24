import { useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import { getPostDetailThunk  } from "../../store/post"

const PostDetail = () => {
    const dispatch = useDispatch();
    const {postId} = useParams();
    const post = useSelector(state => state.post[postId]);
    // const session = useSelector(state => state.session.user);
    const [postIsLoaded, setPostIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getPostDetailThunk(postId)).then(() => setPostIsLoaded(true));
    }, [dispatch]);


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
                        <div>
                            <button>Delete</button>
                            <button>Edit</button>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div><img alt="" src={post.user.profileImage}></img></div>
                            <div>
                                <div>
                                    <p>{post.user.username} {post.content}</p>
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
