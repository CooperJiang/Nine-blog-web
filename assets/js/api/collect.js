export default ($axios) => (path) => {
  return {
    set: (params) => $axios.$post(`${path}/set`, params),
  }
}
