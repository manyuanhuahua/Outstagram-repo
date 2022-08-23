import { useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import { getOwnPostsThunk } from "../../store/post"


const GetPosts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.post);
    const session = useSelector(state => state.session.user);
    const [postsIsLoaded, setPostsIsLoaded] = useState(false);
    const postsList = Object.values(posts);


    useEffect(() => {
        dispatch(getOwnPostsThunk()).then(() => setPostsIsLoaded(true));
    }, [dispatch]);

    return (postsIsLoaded && <>
           <div>
                <div>
                    <div>
                    <img alt="" src={session.profile_image}></img>
                    </div>
                </div>
                <div>
                    <p>{session.username}</p>
                    <p>{session.total_posts} posts</p>
                    <p>{session.total_followers} followers</p>
                    <p>{session.total_followings} followings</p>
                    <p>{session.fullname}</p>
                </div>
           </div>
           <div>POSTS</div>
           <div>{ postsList.map(post =>
            (
            <div>
            <div><img alt="" src={post.imageUrl}></img></div>
            <div>
                <p>{post.totalLikes}</p>
                <p>{post.totalComments}</p>
            </div>
           </div>)
           )
           }

           </div>
    </>)
}


export default GetPosts;
