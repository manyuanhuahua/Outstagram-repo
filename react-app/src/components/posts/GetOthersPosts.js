import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getOthersPostsThunk } from "../../store/post"
import { followUserThunk, editSessionProfileThunk } from "../../store/session";
import { grabUserInfo } from "../../store/session";
import "../../styles/profilePage.css"
import '../../styles/LoginForm.css';
import UploadPicture from "../uploadPicture/uploadPicture";
import { Modal } from "../../context/Modal";
import './GetOthersPosts.css';
// test deploy

const GetOthersPosts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.post);
    const session = useSelector(state => state.session.user);
    const user = useSelector(state => state.session.users);

    const [postsIsLoaded, setPostsIsLoaded] = useState(false);
    const postsList = Object.values(posts);
    const { userId } = useParams();
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [username, setUsername] = useState(session?.username);
    const [profileImage, setProfileImage] = useState(session?.profile_image);
    const [errors, setErrors] = useState([]);
    const [usernameValidationErrors, setUsernameValidationErrors] = useState([]);



    const handleFollows = async (userId) => {
        await dispatch(followUserThunk(userId))
        await dispatch(grabUserInfo(userId))
    }


    useEffect(() => {
        dispatch(getOthersPostsThunk(userId)).then(dispatch(grabUserInfo(userId))).then(() => setPostsIsLoaded(true));
    }, [dispatch, userId]);

    useEffect(() => {
        setErrors([]);
        const errors = [];
        if (username.length === 0) errors.push("Username is required");
        if (username.length > 40) errors.push("Username must be 40 characters or less");
        setUsernameValidationErrors(errors);
    }, [username])



    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const userProfile = {
            username,
            profile_image: profileImage
        }

        dispatch(editSessionProfileThunk(userId, userProfile))
            .then(
                (res) => {
                    if (res.errors) {
                        setErrors(res.errors)
                    } else {
                        setShowEditProfileModal(false)
                    }
                }
            )

    }


    return (postsIsLoaded && <div className="section">
        <div className="top-container">
            <div className="left-part">
                <img className="profile-img" alt="" src={user.profile_image}></img>

            </div>
            <div className="right-part">
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <h2 className="top-name">{user.username}</h2>
                    {session.id !== user.id ?
                        <button style={{ fontSize: '14px', marginLeft: '60px', width: '95px', heigth: '35px' }} className={user.follow_status === 1 ? "unfollow-button" : "login-button"} onClick={() => handleFollows(userId)}>{user.follow_status === 1 ? 'Unfollow' : 'Follow'}</button> :
                        <button className="edit-profile-button" onClick={() => setShowEditProfileModal(true)}>Edit Profile</button>
                    }
                    {
                        showEditProfileModal &&
                        <Modal onClose={() => setShowEditProfileModal(false)}>
                            <div className="edit-profile-modal-container">
                                <h1>Edit Your Profile</h1>
                                <UploadPicture setProfileImage={setProfileImage} action='editProfile' />
                                <form className="edit-profile-form" onSubmit={handleSubmit}>
                                    <ul>
                                        {errors.map((error, idx) => (
                                            <li key={idx} className='error'>{error}</li>
                                        ))}
                                    </ul>
                                    <div className="edit-profile-form-username">
                                        <label>User Name:</label>
                                        <input
                                            type="text"
                                            name="user name"
                                            onChange={e => { setUsername(e.target.value) }}
                                            value={username}
                                        ></input>
                                        <>
                                            {usernameValidationErrors.map((error, idx) => (
                                                <li key={idx} className='error'>{error}</li>
                                            ))}
                                        </>
                                    </div>
                                    <button type="submit">submit</button>
                                </form>
                            </div>
                        </Modal>
                    }

                </div>
                <div className="mid-nums">
                    <p><span>{user.total_posts}</span>posts</p>
                    <p><span>{user.total_followers - 1}</span>{(user.total_followers - 1) > 1 ? "followers" : "follower"}</p>
                    <p><span>{user.total_followings}</span>{user.total_followings > 1 ? "followings" : "following"}</p>
                </div>
                <div className="bottom-fullname">
                    <p className="userFullname">{user.fullname}</p>
                    <p className="userBio">{user.bio}</p>
                </div>
            </div>
        </div>
        <div className="mid-container"></div>
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
