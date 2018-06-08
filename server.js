//
// Note: Depending on what nuxt version you are running and various other factors, this may change over time.
// Best to reference the latest version in nuxt's examples which I pulled this from:
// https://github.com/nuxt/nuxt.js/blob/dev/examples/custom-server/server.js
// 

const app = require('express')()
const { Nuxt, Builder } = require('nuxt')

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

console.log('HOST', process.env.HOST)
console.log('PORT', process.env.PORT)

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
app.listen(port, host)