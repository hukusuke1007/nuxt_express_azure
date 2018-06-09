//
// Note: Depending on what nuxt version you are running and various other factors, this may change over time.
// Best to reference the latest version in nuxt's examples which I pulled this from:
// https://github.com/nuxt/nuxt.js/blob/dev/examples/custom-server/server.js
// 

const app = require('express')()
const { Nuxt, Builder } = require('nuxt')
let http = require('http')
// const host = process.env.HOST || '127.0.0.1'
// const port = process.env.PORT || 3000
const port = process.env.PORT || 1337
console.log('PORT', port)

// Import and set Nuxt.js options
let config = require('./nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

const nuxt = new Nuxt(config)

// Start build process in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Start express server
app.listen(port)
let server = http.createServer(app)
server.timeout = 15 * 60 * 1000  //タイムアウト追加 15分に延長。
console.log("Server running at http://localhost", port)