const yaml = require('js-yaml')
const fs = require('fs')
const { getRequestTypes, getResponseTypes } = require('./getTypes')
const makeRequest = require('./request')
const templates = require('./templates')

const run = async () => {
  console.clear()
  try {
    const doc = yaml.safeLoad(fs.readFileSync('./test/simple.yml'))
    const endpoints = Object.keys(doc)
    console.log(`${endpoints.length} endpoint(s) found.`)
    const endpointDocs = endpoints.map(async endpoint => {
      const endpointConfig = doc[endpoint]
      const reqTypes = getRequestTypes(endpointConfig)
      const res = await makeRequest(endpointConfig)
      const resTypes = getResponseTypes(res)
      return templates.endpoint({ reqTypes, resTypes })
    })

    Promise.all(endpointDocs)
      .then(docs => {
        const docPath = './doc-it/documentation.md'
        !fs.existsSync('./doc-it') && fs.mkdirSync('doc-it')
        fs.writeFileSync(docPath, templates.header)
        docs.forEach(doc => {
          fs.appendFileSync(docPath, doc)
        })
      })

  } catch(e) {
    console.log(e)
  }
}

run()