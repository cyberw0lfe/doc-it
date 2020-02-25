const header = `# API Documentation
`

const endpoint = config => `## ${config.reqTypes.url}
### request
\`\`\`json
${JSON.stringify(config.reqTypes, null, '  ')}
\`\`\`
### response
\`\`\`json
${JSON.stringify(config.resTypes, null, '  ')}
\`\`\`
`

module.exports = {
  header,
  endpoint
}