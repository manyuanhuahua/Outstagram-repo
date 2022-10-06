// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const SET_USERS = 'session/SET_USERS';
const FOLLOW_USER = 'session/FOLLOW_USER';
const SET_USER_PROFILE = 'session/SET_USER_PROFILE'
const EDIT_SESSION_PROFILE = 'session/EDIT_SESSION_PROFILE'

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const setUsers = (users) => ({
  type: SET_USERS,
  payload: users
})

const setUserInfo = (user) => ({
  type: SET_USER_PROFILE,
  payload: user
})

const editSessionProfile = (user) => {
  return {
    type: EDIT_SESSION_PROFILE,
    user
  }
}

const followUser = (userId, totalFollows, follow_status) => {
  return {
    type: FOLLOW_USER,
    userId,
    totalFollows,
    follow_status
  }
}

const initialState = { user: null, users: {} };



export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const grabUserInfo = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}`)

  if (response.ok) {
    const data = await response.json()
    dispatch(setUserInfo(data))
  }
}

export const signUp = (username, fullname, email, password) => async (dispatch) => {

  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
      fullname
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const getAllUsers = () => async (dispatch) => {
  const response = await fetch('api/users/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const data = await response.json()
  dispatch(setUsers(data))
  return data
}

export const followUserThunk = (userId) => async dispatch => {
  const response = await fetch(`/api/follows/following/${userId}`, {
    method: 'PUT',
    headers: { 'Content_Type': 'application/json' },
  })
  if (response.ok) {
    const data = await response.json()

    dispatch(followUser(userId, data.totalFollows, data.follow_status))
  }
  return response
}


export const editSessionProfileThunk = (userId, userProfile) => async dispatch => {
  const response = await fetch(`/api/users/${userId}/edit`, {
    method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userProfile)
  });

  const res = await response.json()
    if (response.ok) {
        dispatch(editSessionProfile(res));
    }
    return res
}





export default function reducer(state = initialState, action) {
  const newState = { ...state }
  switch (action.type) {
    case SET_USER:
      return { user: action.payload, users: state.users }
    case REMOVE_USER:
      return { user: null, users: state.users }
    case SET_USERS:
      action.payload.users.forEach(user => {
        newState.users[user.id] = user
      })
      return newState
    case SET_USER_PROFILE:
      newState.users = action.payload
      return newState
    case FOLLOW_USER:
      newState.users.followStatus = { ...newState[action.userId], totalFollows: action.totalFollows, follow_status: action.follow_status }
      return newState
    case EDIT_SESSION_PROFILE:
      newState.user = action.user
      newState.users = action.user
      return newState
    default:
      return state;
  }
}
