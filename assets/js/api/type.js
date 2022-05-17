export default ($axios) => (path) => {
  return {
    query: (params) => $axios.$get(`${path}/query`, {params}),
    detail: (params) => $axios.$get(`${path}/detail`, params),
    hot: (params) => $axios.$get(`${path}/hot`, params)
  }
}
