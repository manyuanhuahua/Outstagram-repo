import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getOthersPostsThunk } from "../../store/post"
import { followUserThunk } from "../../store/session";
import { grabUserInfo } from "../../store/session";
import "../../styles/profilePage.css"
import '../../styles/LoginForm.css';
// test deploy

const GetOthersPosts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.post);
    const session = useSelector(state => state.session.user);
    const user = useSelector(state => state.session.users);

    const [postsIsLoaded, setPostsIsLoaded] = useState(false);
    const postsList = Object.values(posts);
    const { userId } = useParams();
    const handleFollows = async (userId) => {
        await dispatch(followUserThunk(userId))
        await dispatch(grabUserInfo(userId))
    }


    useEffect(() => {
        dispatch(getOthersPostsThunk(userId)).then(dispatch(grabUserInfo(userId))).then(() => setPostsIsLoaded(true));
    }, [dispatch, userId]);


    return (postsIsLoaded && <div className="section">
        <div className="top-container">
            <div className="left-part">
                <img className="profile-img" alt="" src={user.profile_image}></img>

            </div>
            <div className="right-part">
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h2 className="top-name">{user.username}</h2>
                    {session.id !== user.id && (
                        <button style={{ fontSize: '14px', marginLeft: '60px', width: '95px', heigth: '35px' }} className="login-button" onClick={() => handleFollows(userId)}>{user.follow_status === 1 ? 'Unfollow' : 'Follow'}</button>
                    )
                    }
                </div>
                <div className="mid-nums">
                    <p><span>{user.total_posts}</span>posts</p>
                    <p><span>{user.total_followers}</span>followers</p>
                    <p><span>{user.total_followings}</span>followings</p>
                </div>
                <div className="bottom-fullname">{user.fullname} </div>
            </div>
        </div>
        <div className="mid-container">POSTS</div>
        <div className="bottom-container">
            {postsList.map(post => (
                <div className="img-container" key={post.id}>
                    <NavLink to={`/posts/${post.id}`}>
                        <img className="post-img" alt="" src={post.imageUrl} />
                    </NavLink>
                    <div className="hover-text">
                        {/* <p>{post.totalLikes}</p>
                        <p>{post.totalComments}</p> */}
                    </div>
                </div>)
            ).reverse()
            }
        </div>
    </div>

    )
}


export default GetOthersPosts;
