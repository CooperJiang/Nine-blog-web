export default ($axios) => (path) => {
  return {
    search: (params) => $axios.$get(`${path}/search`, { params }),
    collect: (params) => $axios.$get(`${path}/collect`, { params }),
    remove: (params) => $axios.$get(`${path}/remove`, { params }),
    hot: (params) => $axios.$get(`${path}/hot`, { params })
  }
}
