export default ($axios) => (path) => {
  return {
    set: (params) => $axios.$post(`${path}/set`, params),
    query: (params) => $axios.$get(`${path}/query`, { params }),
  }
}
