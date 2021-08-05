const formatMDfile = require('../format-md-file')

test('format md file', () => {
  const data = [
    {
      title: "mathematician's lament",
      name: "my name 1",
      value: 'my value 1'
    },
    {
      title: 'my test 2',
      name: 'my name 2',
      value: 'my value 2'
    }
  ]
  const result = formatMDfile(data, 'articles')
const expectedResult = 
`---
articles:
  - title: "mathematician's lament"
    name: "my name 1"
    value: "my value 1"
  - title: "my test 2"
    name: "my name 2"
    value: "my value 2"
---
`
  expect(result).toEqual(expectedResult)
})
