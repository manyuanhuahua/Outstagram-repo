import { useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import { getOthersPostsThunk } from "../../store/post"
import "../../styles/profilePage.css"

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


    return (postsIsLoaded && <div className="section">
             <div className="top-container">
                <div className="left-part">
                    <img className="profile-img" alt="" src={postsList[0].user.profileImage}></img>

                </div>
                <div className="right-part">
                    <h2 className="top-name">{postsList[0].user.username}</h2>
                    <div className="mid-nums">
                        <p><span>{postsList[0].user.total_posts}</span>posts</p>
                        <p><span>{postsList[0].user.total_followers}</span>followers</p>
                        <p><span>{postsList[0].user.total_followings}</span>followings</p>
                    </div>
                    <div className="bottom-fullname">{postsList[0].user.fullname} </div>
                </div>
           </div>
           <div className="mid-container">POSTS</div>
           <div className="bottom-container">
           { postsList.map(post =>(
            <div className="img-container" key={post.id}>
                <NavLink to={`/posts/${post.id}`}>
                <img className="post-img" alt="" src={post.imageUrl} />
                </NavLink>
                <div className="hover-text">
                <p>{post.totalLikes}</p>
                <p>{post.totalComments}</p>
                </div>
            </div>)
           )
           }
           </div>
        </div>

    )
}


export default GetOthersPosts;
