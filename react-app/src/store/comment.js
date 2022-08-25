const GET_COMMENTS = "comment/GET_COMMENTS"
const CREATE_COMMENT = "comment/CREATE_COMMENT"
const DELETE_COMMENT = "comment/DELETE_COMMENT"
const LIKE_COMMENT = "comment/LIKE_COMMENT"


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

const deleteComment = (commentId) => {
  return {
    type: DELETE_COMMENT,
    commentId
  }
}

const likeComment = (commentId, totalLikes, likeStatus) => {
  return {
    type: LIKE_COMMENT,
    commentId,
    totalLikes,
    likeStatus
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

export const deleteCommentThunk = (postId, commentId) => async dispatch => {
  const response = await fetch(`/api/posts/${postId}/comments/${commentId}`, {
    method:'DELETE'
  })
  if (response.ok) {
    dispatch(deleteComment(commentId))
  }
  return response
}

export const likeCommentThunk = (postId, commentId) => async dispatch => {
  const response = await fetch(`/api/posts/${postId}/comments/${commentId}/likes`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({})
  });
  if (response.ok) {
    const data = await response.json();
  
    dispatch(likeComment(commentId, data.totalLikes, data.likeStatus ))
  }
  return response
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
      case DELETE_COMMENT: {
        newState = {...state}
        delete newState[action.commentId]
        return newState
      }
      case LIKE_COMMENT: {
        newState = {...state}
        newState[action.commentId] = {...newState[action.commentId], totalLikes:action.totalLikes, likeStatus: action.likeStatus }
        return newState
      }
      default:
        return state;
    }
  }
