import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { createCommentThunk } from "../../store/comment";
import EmojiPicker from 'emoji-picker-react';
import icon from "../../assets/commenticon.png"

import "../../styles/createCommentForm.css"

const CreateCommentForm = ({ postId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const session = useSelector(state => state.session.user);
    const [content, setContent] = useState('')
    const [errors, setErrors] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [emoji,setEmoji] = useState('')
    const [showEmoji,setShowEmoji] = useState(false)

    const addEmoji = (emojiData, event)=>{

        setEmoji(emojiData.emoji);
        setContent(content+`${emoji}`)

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const comment = {
            content,
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
    return (
        <div>
             <div className="post-body-comments-wrapper">
                                    {/* <div className="comment-content-box"> */}
                <form className="home-page-comment-form"  onSubmit={handleSubmit}>
                    { showEmoji && <EmojiPicker className='emoji-container'
                         onEmojiClick={addEmoji}
                        width={325}
                        height={333}
                    />}
                    <div className="comment-emoj-icon" >
                        <img src={icon} className='emoji-button' alt='' onClick={()=>{setShowEmoji(!showEmoji)}}/>
                        <textarea
                            value={content}
                            placeholder='Add a comment...'
                            onChange={e=>setContent(e.target.value)}
                            style={{overflow:'break-word'}}
                            maxLength={201}
                        />
                        <button id='submit-comment-button' type="submit" onClick={handleSubmit}>Post</button>
                    </div>
                </form>
                                    {/* </div> */}

                                </div>
            {/* <form onSubmit={handleSubmit} className="create-comment-form">


                <div>
                    {showDetailEmoji && <EmojiPicker className='emoji-container'onEmojiClick={addEmoji} width={325} height={333} />}
                    <img src={icon} className='emoji-button' alt='' onClick={()=>{setShowDetailEmoji(true)}} />
                    <input
                        type={'textarea'}
                        style={{ fontSize: '16px', minWidth: '400px', marginTop: '6px', height: '30px' }}
                        value={content}
                        placeholder="Add comment......"
                        onChange={e => setContent(e.target.value)}
                    />
                    {errors.map((error, idx) => (
                        <li key={idx} >{error}</li>
                    ))}
                </div>
                <div>
                    <button className="login-button" style={{ width: '60px' }}>Post</button>
                </div>

            </form> */}
        </div>
    )
}

export default CreateCommentForm
