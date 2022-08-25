import { useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams, useHistory} from "react-router-dom";
import { updatePostThunk } from "../../store/post";
import "../../styles/editForm.css"


const EditPostForm = ({post,hideModal}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const session = useSelector(state => state.user);

    const [description, setDescription] = useState(post.description)
    const [imageUrl, setImageUrl] = useState(post.imageUrl)

    // const [imageUrlValidationErrors, setImageUrlValidationErrors] = useState([])
    const [errors, setErrors] = useState([])

    // useEffect(() => {
    //     const errors =[];
    //     if (imageUrl.length === 0) errors.push("Image is required.");
    //     setImageUrlValidationErrors(errors);
    // }, [imageUrl])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const newPost = {
            id:post.id,
            description,
            image_url:imageUrl
        };
        dispatch(updatePostThunk(newPost))
        .then(
            async (res) => {
            if ( res.errors ) {
                    setErrors(res.errors)
            }
            else {
                hideModal()
                history.push(`/posts/${res.id}`);
            }

        })
        }

        return (
            <div>
                <div className="edit-form-header">
                    <h2>Edit the Post</h2>
                </div>
            <div className="edit-form-container">
                <form className="edit-post-form" onSubmit={handleSubmit}>

                    <div className="edit-form-content">
                    <label>Description: </label>
                        <input
                        type={'text'}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                         />
                    </div>
                    <div className="edit-form-buttons">
                        <button type="submit">Done</button>
                        <button type="button" onClick={()=>hideModal()}>Cancel</button>

                    </div>
                    <ul>
                    {errors.map((error, idx) => (
                        <li key={idx} >{error}</li>
                    ))}
                    </ul>
                </form>
                </div>
                <div>
                    {/* <button onClick={history.goBack}>Cancel</button> */}
                </div>
            </div>
        )


}


export default EditPostForm;
