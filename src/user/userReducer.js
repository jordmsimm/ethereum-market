const initialState = {
  data: null,
  admin:false,
  owner:false,
  store:false,
  storeOwnerName:'',
  storePending:false
}

const userReducer = (state = initialState, action) => {
  if (action.type === 'USER_LOGGED_IN' || action.type === 'USER_UPDATED')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  if (action.type === 'USER_LOGGED_OUT')
  {
    return Object.assign({}, state, {
      data: null,
      admin:false,
      owner:false,
      
    })
  }

  if (action.type === 'SET_ADMIN')
  {
    return Object.assign({}, state, {
      admin: action.payload.admin
    })
  }

  if (action.type === 'SET_OWNER')
  {
    return Object.assign({}, state, {
      owner: action.payload.owner
    })
  }

  if (action.type === 'SET_STORE')
  {
    return Object.assign({}, state, {
      store: action.payload.store,
      storeOwnerName: action.payload.storeOwnerName,
      storePending:action.payload.storePending
    })
  }

  return state
} 

export default userReducer
