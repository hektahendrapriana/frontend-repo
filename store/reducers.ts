const initialState = {
  footballers: [],
  loading: true
}

const usersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "getUsers":
      return {
        ... state,
        usersData: action.payload,
        loading: false
      }

    case "createUser":
      return {
        ... state,
        createUserData: action.payload,
        loading: false
      } 
        
    case "updateUser": 
      return {
        ... state,
        updatedData: action.payload,
        loading: false
      } 

    default: 
      return state    
  }
}

export default usersReducer;
