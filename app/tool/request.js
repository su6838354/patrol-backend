const axios = require('axios')

// create an axios instance
const service = axios.create({
  // baseURL: 'http://121.40.98.157:89',
  timeout: 5000 // request timeout
})


module.exports = service

