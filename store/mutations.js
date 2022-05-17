const mutations = {
  setToken(state, token) {
    state.token = token
  },

  setUserInfo(state, data) {
    state.userInfo = data
  },

  setTypeIndex(state, typeIndex) {
    state.typeIndex = typeIndex
  },

  setTypeList(state, typeList) {
    state.typeList = typeList
  },

  setTagList(state, tagList) {
    state.tagList = tagList
  },

  setHighLightIndex(state, { index }) {
    state.highLightIndex = index
  },

  setSignInModal(state, isShow) {
    state.showSignInModal = isShow
  },

  setSignUpModal(state, isShow) {
    state.showSignUpModal = isShow
  },

  setShowMenu(state, isShow) {
    state.isShowMenu = isShow
  },

  /* >>>>>>>>>>>>>>> chat <<<<<<<<<<<<<<<<< */
  /* 把大厅置顶 */
  setRoomId(state, roomId) {
    state.roomId = roomId
  },
  setRecommendRoomList(state, roomList) {
    let hallInfo = {}
    const hallIndex = roomList.findIndex( t => Number(t.roomId) === 888)
    hallIndex !== -1 && (hallInfo = roomList.splice(hallIndex, 1));
	  hallIndex !== -1 && (roomList = [...hallInfo, ...roomList]);
    state.recommendRoomList = roomList
  },

  resetStoreChat(state) {

  }
}
export default mutations
