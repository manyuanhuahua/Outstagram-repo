import { useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams, useHistory} from "react-router-dom";
import { createCommentThunk } from "../../store/comment";

const CreateCommentForm = ({postId}) =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const session = useSelector(state => state.session.user);

    const [content, setContent] = useState('')
    const [errors, setErrors] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)


    const handleSubmit =async (e) =>{
        e.preventDefault();
        setErrors([]);
        const comment = {
            content,
            userId : session.id,
        }
        dispatch(createCommentThunk(postId,comment))
            .then(
                async (res)=> {
                    if (res.errors){
                        setErrors(res.errors)
                    }else{
                        setContent("")
                    }
                })
    }
    return (
        <div>
        <form onSubmit={handleSubmit}>

        <label>Comment sign</label>
        <div>

        <input
            type={'textarea'}
            value={content}
            placeholder="Add comment......"
            onChange={e => setContent(e.target.value)}
        />
        {errors.map((error, idx) => (
            <li key={idx} >{error}</li>
        ))}
        </div>
        <div>
            <button>Post</button>
        </div>

        </form>
        </div>
    )
}

export default CreateCommentForm
