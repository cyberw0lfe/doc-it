const yaml = require('js-yaml')
const fs = require('fs')
const axios = require('axios')

const createObjDoc = data => {
  const keys = Object.keys(data)
  const doc = {}
  keys.forEach(key => {
    const type = typeof data[key]
    type === 'object'
      ? doc[key] = createObjDoc(data[key]) // call recursively if object
      : doc[key] = type // otherwise, set type
  })
  return doc
}

const createReqDoc = config => {
  console.log('Creating request documentation...')
  const doc = {
    url: config.url,
    method: config.method
  }
  // if something with body, doc['body'] = createObjDoc(config.body)
  return doc
}

const createResDoc = res => {
  console.log('Creating response documentation...')
  return {
    status: res.status,
    data: createObjDoc(res.data)
  }
}

const makeRequest = async config => {
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

const run = () => {
  try {
    const doc = yaml.safeLoad(fs.readFileSync('./test/simple.yml'))
    const endpointNames = Object.keys(doc)
    console.log(`${endpointNames.length} endpoint(s) found.`)
    endpointNames.forEach(async endpointName => {
      const endpointConfig = doc[endpointName]
      const reqDoc = createReqDoc(endpointConfig)
      const res = await makeRequest(endpointConfig)
      const resDoc = createResDoc(res)
      // make human readable docs
    })
  } catch(e) {
    console.log(e)
  }
}

console.clear()
run()