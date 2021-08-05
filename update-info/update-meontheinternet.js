const getVideos = require('./get-videos')
const getArticles = require('./get-articles')
const getBooks = require('./get-books')
const fs = require('fs')
const formatMDFile = require('./format-md-file')

const run = async () => {
  let articles
  let videos 
  let books
  try {
    articles = await getArticles()
    videos = await getVideos()  
    books = await getBooks()
  }catch(err) {
    console.error(err)
  }
  articles = formatMDFile(articles, 'articles')
  videos = formatMDFile(videos, 'videos')
  books = formatMDFile(books, 'books')
  
  try {
    fs.writeFileSync('./content/articles.md', articles)
    fs.writeFileSync('./content/videos.md', videos)
    fs.writeFileSync('./content/books.md', books)
  }catch(err) {
    console.error(err) 
    return 
  }
  console.log('Me On The The Internet updated!')
}

module.exports = run
