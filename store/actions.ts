export const getUsersList = (userData: any) => {
  return {
      type: "getUsers",
      payload: userData
  }
}

export const createNewUser = (data: any) => {
  return {
      type: "createUser",
      payload: data
  }
}

export const updateUser = (updatedData: any) => {
  return {
      type: "updateUser",
      payload: updatedData
  }
}