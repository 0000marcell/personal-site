const { execSync } = require('child_process')

const checkIfTheresSomethingToUpdate = () => {
  try {
    let result = execSync('git status').toString()
    if (/nothing to commit/.test(result)){
      return false
    }
    return true
  }catch(err) {
    console.error(err)
    return false
  }
}

module.exports = checkIfTheresSomethingToUpdate
