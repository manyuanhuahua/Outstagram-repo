import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getOwnPostsThunk } from "../../store/post"
import "../../styles/profilePage.css"


const GetPosts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.post);
    const session = useSelector(state => state.session.user);
    const [postsIsLoaded, setPostsIsLoaded] = useState(false);
    const postsList = Object.values(posts);


    useEffect(() => {
        dispatch(getOwnPostsThunk()).then(() => setPostsIsLoaded(true));
    }, [dispatch]);

    return (postsIsLoaded && <div className="section">
        <div className="top-container">
            <div className="left-part">
                <img className="profile-img" alt="" src={session.profile_image}></img>
            </div>

            <div className="right-part">
                <h2 className="top-name">{session.username}</h2>
                <div className="mid-nums">
                    <p><span>{session.total_posts}</span>posts</p>
                    <p><span>{session.total_followers - 1}</span>followers</p>
                    <p><span>{session.total_followings}</span>following</p>
                </div>
                <div className="bottom-fullname">{session.fullname}</div>
            </div>
        </div>
        <div className="mid-container">POSTS</div>
        <div className="bottom-container">
            {postsList.map(post => (
                <div className="img-container">
                    <NavLink to={`/posts/${post.id}`}>
                        <img className="post-img" alt="" src={post.imageUrl}></img>
                    </NavLink>
                    {/* <p>{post.totalLikes}</p>
                    <p>{post.totalComments}</p> */}
                </div>)
            )
            }
        </div>
    </div>)
}


export default GetPosts;
