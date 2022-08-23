import { useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import { getOthersPostsThunk } from "../../store/post"


const GetOthersPosts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.post);
    // const session = useSelector(state => state.session.user);
    const [postsIsLoaded, setPostsIsLoaded] = useState(false);
    const postsList = Object.values(posts);
    const {userId} = useParams();


    useEffect(() => {
        dispatch(getOthersPostsThunk(userId)).then(() => setPostsIsLoaded(true));
    }, [dispatch]);


    return (postsIsLoaded && <>
            <div>
                <div>
                    <div>
                    <img alt="" src={postsList[0].user.profileImage}></img>
                    </div>
                </div>
                <div>
                    <p>{postsList[0].user.username}</p>
                    <p>{postsList[0].user.total_posts} posts</p>
                    <p>{postsList[0].user.total_followers} followers</p>
                    <p>{postsList[0].user.total_followings} followings</p>
                    <p>{postsList[0].user.fullname}</p>
                </div>
           </div>
           <div>POSTS</div>
           <div>{ postsList.map(post =>
            (
            <div key={post.id}>
            <div><img alt="" src={post.imageUrl}></img></div>
            <div>
                <p>{post.totalLikes}</p>
                <p>{post.totalComments}</p>
            </div>
           </div>)
           )
           }

        </div>
 </>
    )
}


export default GetOthersPosts;
