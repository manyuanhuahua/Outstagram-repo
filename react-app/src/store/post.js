
const GET_OWN_POSTS = "post/GET_OWN_POSTS"
const GET_OTHERS_POSTS = "post/GET_OTHERS_POSTS"
const GET_POST_DETAIL = "post/GET_POST_DETAIL"


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

      default:
        return state;
    }
  }
