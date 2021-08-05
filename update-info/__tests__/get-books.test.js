const getBooks = require('../get-books')

test('return some books', async () => { 
  let result = await getBooks() 
  expect(result.length).toBeGreaterThan(0)
})

test('return all the fields', async () => {
  let result = await getBooks() 
  expect(result[0].img).not.toBeUndefined()
  expect(result[0].title).not.toBeUndefined()
  expect(result[0].dateRead).not.toBeUndefined()
})

test('return in chronological order', async () => {
  let results = await getBooks() 
  let prev = ''
  let check = true
  for (let i = 0; i < results.length; i++) {
    if(new Date(results[i].dateRead) < new Date(prev.dateRead)) {
      check = false
    }
    prev = results[i].dateRead
  }
  expect(check).toEqual(true)
})
