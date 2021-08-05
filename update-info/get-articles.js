const fetch = require('node-fetch')

const fetchData = async () => {
  let data
  try {
    data = await fetch(`https://dev.to/api/articles?username=____marcell`) 
    if (!data.ok){
      console.error('error:', data) 
      return
    }
    data = await data.json()
    return data
  } catch(err) {
    console.error(err)  
  }
} 

const getArticles = async () => {
  let results = await fetchData()
  let articles = []
  for (let article  of results) {
    let { title, url, description, published_timestamp } = article
    articles.push({
      title: title, 
      url: url,
      description: description,
      published: published_timestamp
    })
  }
  return articles
}

module.exports = getArticles 
