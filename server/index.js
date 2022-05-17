const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const config = require('../nuxt.config.js')
const app = new Koa()
config.dev = app.env !== 'production'

async function start() {
  const nuxt = new Nuxt(config)
  const { host, port = process.env.PORT || 6888 } = nuxt.options.server
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false
    ctx.req.ctx = ctx
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
