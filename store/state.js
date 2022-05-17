const state = () => ({
  token: null,
  userInfo: null,
  typeIndex: 0,
  typeList: [],
  tagList: [],
  highLightIndex: 0,
  showSignInModal: false,
  showSignUpModal: false,
  isShowMenu: false,
  /* >>>>>>>>>>> chat <<<<<<<<<<< */
  roomId: 888, // 当前所在房间
  recommendRoomList: []
})

export default state
