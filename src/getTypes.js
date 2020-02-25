const getObjectTypes = data => {
  const keys = Object.keys(data)
  const types = {}
  keys.forEach(key => {
    const type = typeof data[key]
    type === 'object'
      ? types[key] = getObjectTypes(data[key]) // call recursively if object
      : types[key] = type // otherwise, set type
  })
  return types
}

const getRequestTypes = config => {
  console.log('Creating request documentation...')
  const doc = {
    url: config.url,
    method: config.method
    // data with types
  }
  // if something with body, doc['body'] = getObjectTypes(config.body)
  return doc
}

const getResponseTypes = res => {
  console.log('Creating response documentation...')
  return {
    status: res.status,
    data: getObjectTypes(res.data)
  }
}

module.exports = {
  getRequestTypes,
  getResponseTypes
}