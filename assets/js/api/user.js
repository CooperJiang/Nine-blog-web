export default ($axios) => (path) => {
  return {
    register: (params) => $axios.$post(`${path}/register`, params),
    login: (params) => $axios.$post(`${path}/login`, params),
    getInfo: (params) => $axios.$get(`${path}/getInfo`, params),
    update: (params) => $axios.$post(`${path}/update`, params)
  }
}
