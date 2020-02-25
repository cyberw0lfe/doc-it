const axios = require('axios')

module.exports = async config => {
  // map this when adding more
  // consider headers too
  if(config.method.toLowerCase() === 'get') {
    console.log(`Making GET request to ${config.url}`)
    const res = await axios.get(config.url)
    return {
      status: res.status,
      data: res.data
    }
  }
}