import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as postActions from '../store/post'
import { useDispatch, useSelector } from "react-redux";
import UsersList from "./UsersList";
import '../styles/homePage.css'
import likeIcon from '../Images/instagram-like-icon.png';
import likedIcon from '../Images/PngItem_5229528.png'
import commentIcon from '../Images/instagram-comment-icon.png';
import { likePostThunk } from "../store/post";

const HomePage = () => {
    const dispatch = useDispatch()
    const posts = Object.values(useSelector(state => state.post))



    useEffect(() => {
        dispatch(postActions.getAllPostsThunk())
    }, [dispatch])

    const handleLikes = async (postId) => {
        return dispatch(likePostThunk(postId))
    }

    return (
        <>

            <div className="home-page-container">
                <div className="posts-list">
                    {posts &&
                        posts.map(post =>
                            <div className="post-wrapper">

                                <div className="post-header-wrapper">
                                    <NavLink to={`/users/${post.userId}/posts`}>
                                        <img src={post.user.profileImage} alt="user-profile-pic" style={{ height: '32px', width: '32px', borderRadius: '50%' }} />
                                    </NavLink>
                                    <NavLink className="post-header-username" to={`/users/${post.userId}/posts`}>
                                        <div>{post.user.username}</div>
                                    </NavLink>
                                </div>
                                <img style={{ height: '572px', width: '470px' }} src={post.imageUrl} alt='image' />
                                <div >
                                    <div className="post-body-like-comment-icons" style={{ display: "flex", flexDirection: 'row', padding: '12px 6px', paddingBottom: '0px' }}>
                                        <div onClick={() => handleLikes(post.id)}>
                                            {post.likeStatus === 1 ?
                                                <img src={likedIcon} alt="like-button-icon" className="like-button-icon" style={{ height: '24px', width: '24px', cursor: 'pointer' }} />
                                                :
                                                <img src={likeIcon} alt="like-button-icon" className="like-button-icon" style={{ height: '24px', width: '24px', cursor: 'pointer' }} />
                                            }

                                        </div>



                                        <NavLink to={`/posts/${post.id}`}>
                                            <img src={commentIcon} alt="comment-button-icon" className="comment-button-icon" style={{ height: '24px', width: '24px' }} />
                                        </NavLink>

                                    </div>
                                </div>
                                <div className="post-like-counter-wrapper">
                                    <div className="post-like-counter">{post.totalLikes} likes</div>
                                </div>
                                <div className="post-body-username-description-wrapper">
                                    <NavLink className="post-header-username" to={`/users/${post.userId}/posts`}>
                                        <div>{post.user.username}</div>
                                    </NavLink>
                                    <div className="post-body-description">{post.description}</div>
                                </div>
                                <div className="post-body-comments-wrapper">
                                    <NavLink className="post-header-username" to={`/posts/${post.id}`}>
                                        {!post.totalComments ?
                                            <div className="post-body-comments">Add a comment</div> :
                                            <div className="post-body-comments">{post.totalComments === 1 ? `View ${post.totalComments} comment` : `View all ${post.totalComments} comments`}</div>
                                        }
                                    </NavLink>
                                </div>
                            </div>
                        ).reverse()
                    }
                </div>
            </div>

        </>
    )
}

export default HomePage
