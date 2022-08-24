const GET_COMMENTS = "comment/GET_COMMENTS"
const CREATE_COMMENT = "comment/CREATE_COMMENT"


const getComments = (comments) =>{
  return {
    type:GET_COMMENTS,
    comments
  }
}

const createComment = (comment) =>{
  return {
    type:CREATE_COMMENT,
    comment
  }
}

export const getCommentsThunk = (postId) => async dispatch =>{
  const response = await fetch(`/api/posts/${postId}/comments`);
  if(response.ok){
    const comments = await response.json();
    dispatch(getComments(comments))
  }
  return response
}

export const createCommentThunk = (postId,comment)=> async dispatch =>{
  const response = await fetch(`/api/posts/${postId}/comments/new`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
    }
  )
  const data = await response.json()
  if (response.ok){
    dispatch(createComment(data))
  }
  return data
}


const initialState = { };

export default function reducer(state = initialState, action) {
    let newState
    switch (action.type) {
      case GET_COMMENTS:{
        newState = action.comments.Comments
        return newState
      }
      case CREATE_COMMENT:{
        newState = {...state}
        newState[action.comment.id]=action.comment
        return newState
      }
      default:
        return state;
    }
  }
