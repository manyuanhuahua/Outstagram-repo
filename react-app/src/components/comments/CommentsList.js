import { useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import { getCommentsThunk } from "../../store/comment"

const GetComments = ({postId}) => {
    const dispatch = useDispatch();
    const comments = useSelector(state => state.comment);
    const session = useSelector(state => state.session.user);
    const [commentsIsLoaded, setCommentsIsLoaded] = useState(false);
    const commentsList = Object.values(comments)

    useEffect(()=>{
        dispatch(getCommentsThunk(postId)).then(()=>setCommentsIsLoaded(true))
    },[dispatch])

    return (commentsIsLoaded &&

        <div>
            {commentsList.map((comment)=>
            (
            <div key={comment.id}>
                <div>
                <img alt="" src={comment.user.profileImage}/>
                </div>
                <div>
                    <div>{comment.user.username}{comment.content}</div>
                    <div>{comment.createAt}{comment.totalLikes}like</div>
                </div>
            <div>
                <button>heart sign</button>
            </div>
        </div>)
            )}
        </div>
    )
}

export default  GetComments
