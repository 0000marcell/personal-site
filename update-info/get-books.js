const fetch = require('node-fetch')
const fs = require('fs')
const jsdom = require("jsdom")
const { JSDOM } = jsdom

const url = 'https://www.goodreads.com/review/list/72056073-marcell-cruz?shelf=read'

const fetchData = async () => {
  let data
  try {
    data = await fetch(url) 
    if (!data.ok){
      console.error('error:', data) 
      return
    }
    data = await data.text()
    return data
  } catch(err) {
    console.error(err)  
  }
}

const getBooks = async () => {
  //const results = await fetchData()
  const data = await fetchData() 
  const dom = new JSDOM(data)
  const document = dom.window.document
  let results = [] 
  document.querySelectorAll('.bookalike.review').forEach((e) => {
    let date = ''
    if (e.querySelector('.field .date_read_value')){
      date = e.querySelector('.field .date_read_value').textContent.trim()
    }
    results.push({
      img: e.querySelector('.field.cover img').src,
      title: e.querySelector('.field.title div a').textContent.trim(),
      dateRead: date 
    })
  })
  return results 
} 

module.exports = getBooks
