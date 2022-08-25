
const GET_OWN_POSTS = "post/GET_OWN_POSTS"
const GET_OTHERS_POSTS = "post/GET_OTHERS_POSTS"
const GET_POST_DETAIL = "post/GET_POST_DETAIL"
const CREATE_POST = "post/CREATE_POST"
const UPDATE_POST = "post/UPDATE_POST"
const DELETE_POST = "post/DELETE_POST"
const LIKE_POST = "post/LIKE_POST"



const getOwnPosts = (posts) => {
  return {
    type: GET_OWN_POSTS,
    posts
  }
}

const getOthersPosts = (posts) => {
  return {
    type: GET_OTHERS_POSTS,
    posts
  }
}

const getPostDetail = (post) => {
  return {
    type: GET_POST_DETAIL,
    post
  }
}

const createPost = (newPost) => {
  return {
    type: CREATE_POST,
    newPost
  }
}

const updatePost = (post) =>{
  return {
    type:UPDATE_POST,
    post
  }
}

const deletePost = (postId) =>{
  return {
    type:DELETE_POST,
    postId
  }
}

const likePost = (postId, totalLikes, likeStatus) => {
  return {
    type: LIKE_POST,
    postId,
    totalLikes,
    likeStatus
  }
}

export const getOwnPostsThunk = () => async dispatch => {
  const response = await fetch('/api/posts/user/session');
  if (response.ok) {
    const posts = await response.json();
    dispatch(getOwnPosts(posts))
  }

  return response
}

export const getOthersPostsThunk = (id) => async dispatch => {
  const response = await fetch(`/api/posts/user/${id}`);
  if (response.ok) {
    const posts = await response.json();
    dispatch(getOthersPosts(posts))
  }

  return response
  }

export const getPostDetailThunk = (postId) => async dispatch => {
  const response = await fetch(`/api/posts/${postId}`);
  if (response.ok) {
    const post = await response.json();
    dispatch(getPostDetail(post));
  }

  return response
}

export const createPostThunk = (newPost) => async dispatch => {
  const response = await fetch('/api/posts/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(newPost)
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createPost(data))
    return data
  }
  const res = await response.json()
  return res
}

export const updatePostThunk = (post)=> async dispatch =>{

  const response = await fetch(`/api/posts/${post.id}`,{
    method:'PUT',
    headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(post)
  });
  const res = await response.json()
  if(response.ok){
    // const editedPost = await response.json();
    dispatch(updatePost(res));
    // return res
  }
  return res
}

export const deletePostThunk = (postId) => async dispatch =>{
  const response = await fetch(`/api/posts/${postId}`,{
    method:'DELETE',
  });
  if(response.ok){
    dispatch(deletePost(postId))

  }
  return response
}

export const likePostThunk = (postId) => async dispatch => {
  const response = await fetch(`/api/posts/${postId}/likes`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({})
  });
  if (response.ok) {
    const data = await response.json();

    dispatch(likePost(postId, data.totalLikes, data.likeStatus ))
  }
  return response
}



const initialState = { };

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
      case GET_OWN_POSTS: {
        newState = action.posts.Posts;
        return newState;
      }
      case GET_OTHERS_POSTS: {
        newState = action.posts.Posts;
        return newState;
      }
      case GET_POST_DETAIL: {
        newState = {...state}
        newState[action.post.id] = action.post
        return newState
      }
      case CREATE_POST: {
        newState ={...state}
        newState[action.newPost.id] = action.newPost
        return newState
      }
      case UPDATE_POST:{
        newState={...state}
        newState[action.post.id] = action.post
        return newState
      }
      case DELETE_POST:{
        newState = {...state}
        delete newState[action.postId]
        return newState
      }
      case LIKE_POST: {
        newState = {...state}
        newState[action.postId] = {...newState[action.postId], totalLikes:action.totalLikes, likeStatus: action.likeStatus }
        return newState
      }

      default:
        return state;
    }
  }
