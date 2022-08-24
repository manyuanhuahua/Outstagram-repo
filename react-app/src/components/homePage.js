import React, { useEffect } from "react";
import * as postActions from '../store/post'
import { useDispatch, useSelector } from "react-redux";
import UsersList from "./UsersList";
import '../styles/homePage.css'

const HomePage = () => {
    const dispatch = useDispatch()
    const posts = Object.values(useSelector(state => state.post))


    useEffect(() => {
        dispatch(postActions.getOwnPostsThunk())
    }, [dispatch])

    return (
        <>
        <div className="home-page-container">
        <ul className="posts-list">
            {posts &&
                posts.map(post =>
                    <li>
                    {console.log(post)}
                    <img style={{height: '50px', width: '50px'}} src={post.imageUrl} alt='image'/>
                    <p>{post.description}</p>
                    </li>
                )
            }
        </ul>
        <ul className="follower-list">
            <UsersList/>
        </ul>
        </div>
        </>
    )
}

export default HomePage
