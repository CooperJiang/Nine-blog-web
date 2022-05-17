export default ($axios) => (path) => {
  return {
    queryAll: (params) => $axios.$get(`${path}/queryAll`, params)
  }
}
