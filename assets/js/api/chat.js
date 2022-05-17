export default ($axios) => (path) => {
  return {
    history: (params) => $axios.$get(`${path}/history`, {params}),
    emoticon: (params) => $axios.$get(`${path}/emoticon`, {params}),
    roomInfo: (params) => $axios.$get(`${path}/roomInfo`, {params}),
    updateRoom: (params) => $axios.$post(`${path}/updateRoom`, params),
    createRoom: (params) => $axios.$post(`${path}/createRoom`, params),
  }
}
