const fetch = require('node-fetch')
const key = process.env['YOUTUBE_KEY'] 
const channelId = process.env['CHANNEL_ID'] 
const url = `https://www.googleapis.com/youtube/v3/search?key=${key}&channelId=${channelId}&part=snippet,id&order=date&maxResults=20`

const fetchData = async () => {
  let data
  try {
    data = await fetch(url) 
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

const getVideos = async () => {
  let results = await fetchData()
  if(!results.items) {
    return []
  }
  let formatedResults = []
  results = results.items.filter((item) => item.id.kind === 'youtube#video')
  for (let item of results) {
    formatedResults.push({
      title: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url
    })
  }
  return formatedResults
}

module.exports = getVideos
