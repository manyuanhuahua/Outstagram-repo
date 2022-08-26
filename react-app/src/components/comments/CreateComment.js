import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { createCommentThunk } from "../../store/comment";
import "../../styles/createCommentForm.css"

const CreateCommentForm = ({ postId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const session = useSelector(state => state.session.user);

    const [content, setContent] = useState('')
    const [errors, setErrors] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)


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
            <form onSubmit={handleSubmit} className="create-comment-form">

                {/* <label>Comment:</label> */}
                <div>

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

            </form>
        </div>
    )
}

export default CreateCommentForm
