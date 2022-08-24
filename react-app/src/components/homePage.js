import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as postActions from '../store/post'
import { useDispatch, useSelector } from "react-redux";
import UsersList from "./UsersList";
import '../styles/homePage.css'
import likeIcon from '../Images/instagram-like-icon.png';
import commentIcon from '../Images/instagram-comment-icon.png';

const HomePage = () => {
    const dispatch = useDispatch()
    const posts = Object.values(useSelector(state => state.post))
    const user = useSelector(state => state.user)



    useEffect(() => {
        dispatch(postActions.getAllPostsThunk())
    }, [dispatch])
    return (
        <>
            <div className="home-page-container">
                <div className="posts-list">
                    {posts &&
                        posts.map(post =>
                            <div className="post-wrapper">
                                {console.log(post)}
                                <div className="post-header-wrapper">
                                    <img src={post.user.profileImage} alt="user-profile-pic" style={{ height: '32px', width: '32px', borderRadius: '50%' }} />
                                    <NavLink className="post-header-username" to={`/users/${post.user.id}`}>
                                        <div>{post.user.username}</div>
                                    </NavLink>
                                </div>
                                <img style={{ height: '572px', width: '470px' }} src={post.imageUrl} alt='image' />
                                <div>
                                    <div className="post-body-like-comment-icons" style={{ padding: '12px 6px', paddingBottom: '0px' }}>
                                        <img src={likeIcon} alt="like-button-icon" className="like-button-icon" style={{ height: '24px', width: '24px' }} />
                                        <img src={commentIcon} alt="comment-button-icon" className="comment-button-icon" style={{ height: '24px', width: '24px' }} />
                                    </div>
                                </div>
                                <div className="post-like-counter-wrapper">
                                    <div className="post-like-counter">{post.totalLikes} likes</div>
                                </div>
                                <div className="post-body-username-description-wrapper">
                                    <NavLink className="post-header-username" to={`/users/${post.user.id}`}>
                                        <div>{post.user.username}</div>
                                    </NavLink>
                                    <div className="post-body-description">{post.description}</div>
                                </div>
                                <div className="post-body-comments-wrapper">
                                    <div className="post-body-comments">{post.totalComments}</div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <ul className="follower-list">
                    <UsersList />
                </ul>
            </div>
        </>
    )
}

export default HomePage
