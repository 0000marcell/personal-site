const updateMeOnTheInternet = require('../update-info/update-meontheinternet')
const { execSync } = require('child_process')
const checkIfTheresSomethingToUpdate = require('./check-update')

const deploy = async () => {
  try {
    await updateMeOnTheInternet()
    console.log('updating site...')
    execSync('git add --all')  
    if (checkIfTheresSomethingToUpdate()){
      execSync(`git commit -m 'update ${new Date()}'`) 
      execSync('git push')
    } else {
      console.log('nothing was updated!')
    }
  }catch(err) {
    console.error(err) 
    return
  }
}

module.exports = deploy



