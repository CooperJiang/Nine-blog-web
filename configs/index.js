const environment = process.env.NODE_ENV || 'production'
const config = require('./env.' + environment)
module.exports = config
