export default function(ctx) {
  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('storeCache', JSON.stringify(ctx.store.state))
  })
  window.addEventListener('load', () => {
    const storeCache = sessionStorage.getItem('storeCache')
    if (storeCache) {
      ctx.store.replaceState(JSON.parse(storeCache))
    }
  })
}
