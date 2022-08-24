import { useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams, useHistory} from "react-router-dom";
import { createPostThunk } from "../../store/post";

const CreatePostForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const session = useSelector(state => state.session.user);

    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState("")

    const [imageUrlValidationErrors, setImageUrlValidationErrors] = useState([])
    const [errors, setErrors] = useState([])

    useEffect(() => {
        const errors =[];
        if (imageUrl.length === 0) errors.push("Image is required.");
        setImageUrlValidationErrors(errors);
    }, [imageUrl])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const newPost = {
            description,
            image_url:imageUrl
        };
        dispatch(createPostThunk(newPost))
        .then(
            async (res) => {
            if ( res.errors ) {
                    setErrors(res.errors)
            }
            else {
                history.push(`/posts/${res.id}`);
            }
        })
        }

        return (
            <div>
                <div>
                    <h2>Create New Post</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <ul>
                    {errors.map((error, idx) => (
                        <li key={idx} >{error}</li>
                    ))}
                    </ul>
                    <div>
                        <label>Image Url</label>
                        <input
                        type={'text'}
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                         />
                         {/* <>
                         {imageUrlValidationErrors.map((error, idx) => (
                            <li key={idx} className='create-group-error'>{error}</li>
                        ))}
                         </> */}
                    </div>
                    <div>
                    <label>Description</label>
                        <input
                        type={'text'}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                         />
                    </div>
                    <div>
                        <button>Share</button>
                    </div>
                </form>
                <div>
                    <button onClick={history.goBack}>Cancel</button>
                </div>
            </div>
        )


}


export default CreatePostForm;
