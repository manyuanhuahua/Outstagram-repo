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
    const [emoji, setEmoji] = useState('')
    const [showEmoji, setShowEmoji] = useState(false)

    const addEmoji = (emojiData, event) => {

        setEmoji(emojiData.emoji);
        setContent(content + `${emoji}`)

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
                <form className="home-page-comment-form" onSubmit={handleSubmit}>
                    {showEmoji &&
                        <div style={{ position: 'absolute', bottom: '110%' }}>
                            <EmojiPicker className='emoji-container'
                                onEmojiClick={addEmoji}
                                width={325}
                                height={333}
                            />
                        </div>
                    }
                    <div className="comment-emoj-icon" >
                        <img src={icon} className='emoji-button' alt='' onClick={() => { setShowEmoji(!showEmoji) }} />
                        {/* <svg height="24" width="24"><path d="M15.5 10.825q.575 0 .975-.4t.4-.975q0-.575-.4-.975t-.975-.4q-.575 0-.962.4-.388.4-.388.975t.4.975q.4.4.95.4Zm-7 0q.575 0 .963-.4.387-.4.387-.975t-.4-.975q-.4-.4-.95-.4-.575 0-.975.4t-.4.975q0 .575.4.975t.975.4Zm3.5 6.55q1.625 0 2.988-.9 1.362-.9 1.962-2.425h-9.9q.6 1.525 1.962 2.425 1.363.9 2.988.9Zm0 4.425q-2.025 0-3.812-.775-1.788-.775-3.113-2.1-1.325-1.325-2.1-3.113Q2.2 14.025 2.2 12t.775-3.812q.775-1.788 2.1-3.113Q6.4 3.75 8.188 2.975 9.975 2.2 12 2.2t3.812.775q1.788.775 3.113 2.1 1.325 1.325 2.1 3.113Q21.8 9.975 21.8 12t-.775 3.812q-.775 1.788-2.1 3.113-1.325 1.325-3.113 2.1-1.787.775-3.812.775Zm0-9.8Zm0 8.15q3.4 0 5.775-2.375Q20.15 15.4 20.15 12q0-3.4-2.375-5.775Q15.4 3.85 12 3.85q-3.4 0-5.775 2.375Q3.85 8.6 3.85 12q0 3.4 2.375 5.775Q8.6 20.15 12 20.15Z" /></svg> */}
                        <textarea
                            value={content}
                            placeholder=' Add a comment...'
                            onChange={e => setContent(e.target.value)}
                            style={{ overflow: 'break-word', outline: 'none', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
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
