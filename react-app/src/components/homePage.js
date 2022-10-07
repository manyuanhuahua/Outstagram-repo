import React, { useEffect, useState } from "react";
import EmojiPicker,{EmojiClickData} from 'emoji-picker-react';
import { NavLink } from "react-router-dom";
import * as postActions from '../store/post'
import { useDispatch, useSelector } from "react-redux";
import UsersList from "./UsersList";
import '../styles/homePage.css'
import likeIcon from '../Images/instagram-like-icon.png';
import likedIcon from '../Images/PngItem_5229528.png'
import commentIcon from '../Images/instagram-comment-icon.png';
import { likePostThunk } from "../store/post";
import linkedin from '../Images/Linkedin-Free-PNG-Image.png'
import github from '../Images/github-logo.png'
import timPic from '../Images/tim-pic.png'
import brianPic from '../Images/brian-pic.jpg'
import tingPic from '../Images/ting-pic.jpg'
import zhihongPic from '../Images/zhihong-pic.jpg'
import { createCommentThunk } from "../store/comment";
import icon from "../assets/commenticon.png"

const HomePage = () => {
    const dispatch = useDispatch()
    const posts = Object.values(useSelector(state => state.post))
    const session = useSelector(state => state.session.user);
    const [emoji,setEmoji] = useState('')
    const [showEmoji,setShowEmoji] = useState(false)
    const [selectedPost,setSeletedPost] = useState(null)
    const [content, setContent] = useState('')
    const [postId, setPostId] = useState(null)


    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(postActions.getAllPostsThunk())
    }, [dispatch])

    const addEmoji = (emojiData, event)=>{

        setEmoji(emojiData.emoji);
        setContent(content+`${emoji}`)

    }


    const handleLikes = async (postId) => {
        return dispatch(likePostThunk(postId))
    }





    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const comment = {
            content,
            postId,
            userId: session.id,

        }
        dispatch(createCommentThunk(postId, comment))
            .then(
                async (res) => {
                    if (res.errors) {
                        setErrors(res.errors)
                    } else {
                        setContent("")
                    }
                })
    }

    const timeAfterCreated = (createdAt) => {
        const age = Date.now() - Date.parse(createdAt);
        let res;
        const second = Math.floor(age / 1000)
        const minute = Math.floor(second / 60);
        const hour = Math.floor(minute / 60);
        const day = Math.floor(hour / 24);
        const week = Math.floor(day / 7)
        if (week > 0) {
            res = `${week}w`
        }
        else if (day > 0) {
            res = `${day}d`
        }
        else if (hour > 0) {
            res = `${hour}h`
        }
        else if (minute > 0) {
            res = `${minute}m`
        }
        else {
            res = `${second}s`
        }

        return res
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
                                <div className="post-img">
                                    <img  src={post.imageUrl} alt='image' />
                                </div>

                                    <div className="post-body-like-comment-icons" >
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

                                <div className="post-like-counter-wrapper">
                                    <p className="post-like-counter">{post.totalLikes} likes</p>
                                </div>
                                <div className="post-body-username-description-wrapper">
                                    <NavLink className="post-header-username" to={`/posts/${post.id}`}>
                                    <div style={{display:'flex',marginBottom:'8px'}}>
                                    <p style={{fontWeight:'600',marginRight:'4px'}}>{post.user.username}</p>
                                    <p className="post-body-description">{post.description}</p>
                                    </div>
                                    <div className="view-comment-counter">
                                        {post.totalComments > 0? <p>View all {post.totalComments} comment(s)</p>: <></>}
                                    </div>
                                    <div className="view-comment-counter">
                                        <p style={{fontSize:'12px'}}>{timeAfterCreated(post.createdAt)} ago</p>
                                    </div>
                                    </NavLink>
                                </div>
                                <div className="post-body-comments-wrapper">
                                    {/* <div className="comment-content-box"> */}
                                    <form className="home-page-comment-form"  onSubmit={handleSubmit}>
                                        {selectedPost === post.id && showEmoji? <EmojiPicker className='emoji-container'
                                                onEmojiClick={addEmoji}
                                                width={325}
                                                height={333}
                                                />:<></>}
                                        <div className="comment-emoj-icon" >
                                        <img src={icon} className='emoji-button' alt='' onClick={()=>{setShowEmoji(!showEmoji); setSeletedPost(post.id)}}/>
                                        <textarea
                                        value={content}
                                        placeholder='Add a comment...'
                                        onChange={e=>setContent(e.target.value)}
                                        style={{overflow:'break-word'}}
                                        onFocus={()=>setPostId(post.id)}
                                        maxLength={201}
                                        />
                                        <button id='submit-comment-button' type="submit" onClick={handleSubmit}>Post</button>
                                        </div>
                                    </form>
                                    {/* </div> */}

                                </div>
                            </div>
                        ).reverse()
                    }
                </div>
            </div>
            <div className="suggested-hire-outer-wrapper">

                <div className="suggested-hire-wrapper">
                    <h3 className="suggested-devs-to-hire-message">Suggested Dev's To Hire:</h3>
                    <div className="suggested-hire-list">
                        <div>
                            <img src={timPic} className="dev-profile-pic"></img>
                        </div>
                        <div className="dev-name">
                            Tim Reinhardt
                        </div>
                        <div className="suggested-hire-list-item">
                            <a href={'https://www.linkedin.com/in/timreinhardt/'} target="_blank">
                                <img src={linkedin} className="suggested-hire-linkedin-img" alt="linkedin-icon-clickable"></img>
                            </a>
                            <a href={'https://github.com/tjreinhardt'} target="_blank">
                                <img src={github} className="suggested-hire-github-img" alt="github-icon-clickable"></img>
                            </a>
                        </div>
                    </div>
                    <div className="suggested-hire-list">
                        <div>
                            <img src={brianPic} className="dev-profile-pic"></img>
                        </div>
                        <div className="dev-name">
                            Brian Aguilar
                        </div>
                        <div className="suggested-hire-list-item">
                            <a href={'https://www.linkedin.com/in/brian-aguilar-088438247/'} target="_blank">
                                <img src={linkedin} className="suggested-hire-linkedin-img" alt="linkedin-icon-clickable"></img>
                            </a>
                            <a href={'https://github.com/Brian8771'} target="_blank">
                                <img src={github} className="suggested-hire-github-img" alt="github-icon-clickable"></img>
                            </a>
                        </div>
                    </div>
                    <div className="suggested-hire-list">
                        <div>
                            <img src={tingPic} className="dev-profile-pic"></img>
                        </div>
                        <div className="dev-name">
                            Ting Feng
                        </div>
                        <div className="suggested-hire-list-item">
                            <a href={'https://www.linkedin.com/in/tingfeng1113/'} target="_blank">
                                <img src={linkedin} className="suggested-hire-linkedin-img" alt="linkedin-icon-clickable"></img>
                            </a>
                            <a href={'https://github.com/manyuanhuahua'} target="_blank">
                                <img src={github} className="suggested-hire-github-img" alt="github-icon-clickable"></img>
                            </a>
                        </div>
                    </div>
                    <div className="suggested-hire-list">
                        <div>
                            <img src={zhihongPic} className="dev-profile-pic"></img>
                        </div>
                        <div className="dev-name">
                            Zhihong Liu
                        </div>
                        <div className="suggested-hire-list-item">
                            <a href={'https://www.linkedin.com/in/zhihong-liu81/'} target="_blank">
                                <img src={linkedin} className="suggested-hire-linkedin-img" alt="linkedin-icon-clickable"></img>
                            </a>
                            <a href={'https://github.com/zhihongliu81'} target="_blank">
                                <img src={github} className="suggested-hire-github-img" alt="github-icon-clickable"></img>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default HomePage
