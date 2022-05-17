export const token = (state) => state.token

export const typeIndex = (state) => state.typeIndex

export const typeList = (state) => state.typeList

export const tagList = (state) => state.tagList

export const highLightIndex = (state) => state.highLightIndex

export const filterTypeIdByValue = (state) => (value) => {
  return state.typeList.find((t) => t.value === value).id
}

export const userInfo = (state) => state.userInfo

export const showSignInModal = (state) => state.showSignInModal

export const showSignUpModal = (state) => state.showSignUpModal

export const isShowMenu = (state) => state.isShowMenu

export const role = (state) => state.userInfo && state.userInfo.role

export const mineRoomId = (state) => state.userInfo && state.userInfo.roomId

export const recommendRoomList = (state) => state.recommendRoomList

export const roomId = (state) => state.roomId

