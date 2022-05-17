export default ($axios) => (path) => {
  return {
    query: (params) => $axios.$get(`${path}/query`, { params })
  }
}
