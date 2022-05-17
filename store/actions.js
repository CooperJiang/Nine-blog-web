// import { wsURL } from '../configs'
const actions = {
  changeToken({ commit }, token) {
    localStorage.token = token
    commit('setToken', token)
  },

  changeUserInfo({ commit }, data) {
    localStorage.userInfo = JSON.stringify(data)
    commit('setUserInfo', data)
  },

  changeTypeIndex({ commit }, typeIndex) {
    commit('setTypeIndex', typeIndex)
  },

  async queryTypeList({ commit }) {
    const res = await this.$API.type.query({page: 1, pageSize: 100})
    res?.rows.unshift({ name: '全部', value: '/' })
    commit('setTypeList', res?.rows)
  },

  async queryTagList({ commit }) {
    const res = await this.$API.tag.query({ pageSize: 100 })
    commit('setTagList', res?.rows)
  },

  changeHighLightIndex({ commit }, data) {
    commit('setHighLightIndex', data)
  },

  toggleSignInModal({ commit }, isShow) {
    commit('setSignInModal', isShow)
  },

  toggleSignUpModal({ commit }, isShow) {
    commit('setSignUpModal', isShow)
  },

  changeShowMenu({ commit }, isShow) {
    commit('setShowMenu', isShow)
  }
}
export default actions
