import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { createPostThunk } from "../../store/post";
import "../../styles/createForm.css"

const CreatePostForm = ({ hideModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const session = useSelector(state => state.session.user);

    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState("")

    const [imageUrlValidationErrors, setImageUrlValidationErrors] = useState([])
    const [errors, setErrors] = useState([])

    useEffect(() => {
        const errors = [];
        if (imageUrl.length === 0) errors.push("Image is required.");
        setImageUrlValidationErrors(errors);
    }, [imageUrl])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const newPost = {
            description,
            image_url: imageUrl
        };
        dispatch(createPostThunk(newPost))
            .then(
                async (res) => {
                    if (res.errors) {
                        setErrors(res.errors)
                    }
                    else {
                        hideModal()
                        history.push(`/posts/${res.id}`);
                    }
                })
    }

    return (
        <div className="create-post-container" style={{ borderRadius: '50%' }}>
            <div>
                <h2>Create New Post</h2>
            </div>
            <form onSubmit={handleSubmit} style={{ marginTop: '0px' }}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx} >{error}</li>
                    ))}
                </ul>
                <div className="input-container">

                    <div className="input-part">
                        <input
                            type={'text'}
                            value={imageUrl}
                            placeholder='ImageURL...'
                            onChange={e => setImageUrl(e.target.value)}
                        />
                        {/* <>
                         {imageUrlValidationErrors.map((error, idx) => (
                            <li key={idx} className='create-group-error'>{error}</li>
                        ))}
                         </> */}
                    </div>
                    <div>
                        <input
                            type={'text'}
                            value={description}
                            placeholder="Description..."
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div className="bottom-button">
                    <button type="submit" className="login-button" style={{ width: '100px' }}>Share</button>

                    <button onClick={hideModal} className="login-button" style={{ width: '100px' }}>Cancel</button>
                </div>
            </form>
        </div>
    )


}


export default CreatePostForm;
