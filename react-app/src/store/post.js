const initialState = { };

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case SET_USER:
        return { user: action.payload }
      case REMOVE_USER:
        return { user: null }
      default:
        return state;
    }
  }
