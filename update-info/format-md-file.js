const formatMDFile = (data, title) => {
  let results =
`---
${title}:
`
  let spaces = ''
  for (let item of data) {
    Object.keys(item).map((key, i) => {
      spaces = i > 0 ? '   ' : '  -'
      results += `${spaces} ${key}: "${item[key]}"\n`
    })
  }
  results += `---\n`
  return results
} 

module.exports = formatMDFile
